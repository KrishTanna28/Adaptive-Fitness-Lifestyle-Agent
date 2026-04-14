export type MealType = "breakfast" | "lunch" | "dinner" | "snacks";
export type FoodSource = "USDA" | "OpenFoodFacts" | "Manual";

export type FoodCatalogItem = {
  id: string;
  name: string;
  brand?: string;
  source: FoodSource;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  servingSizeGrams?: number;
  servingText?: string;
  imageUrl?: string;
};

type FoodSearchRequest = {
  query: string;
  pageSize?: number;
};

type ProxySearchResponse = {
  items: FoodCatalogItem[];
};

type OpenFoodFactsProduct = {
  code?: string;
  product_name?: string;
  brands?: string;
  serving_size?: string;
  serving_quantity?: number | string;
  serving_quantity_unit?: string;
  quantity?: string;
  image_front_small_url?: string;
  nutriments?: {
    "energy-kcal_100g"?: number;
    proteins_100g?: number;
    carbohydrates_100g?: number;
    fat_100g?: number;
  };
};

const NUTRITION_API_BASE_URL = (process.env.EXPO_PUBLIC_NUTRITION_API_BASE_URL ?? "")
  .trim()
  .replace(/\/$/, "");

function toNumber(value: unknown, fallback = 0) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function parseServingSizeInGrams(value?: string): number | undefined {
  if (!value) {
    return undefined;
  }

  const match = value.match(/(\d+(?:\.\d+)?)\s*g/i);
  if (!match) {
    return undefined;
  }

  const grams = Number(match[1]);
  if (!Number.isFinite(grams) || grams <= 0) {
    return undefined;
  }

  return grams;
}

function parseServingQuantityToGrams(
  quantity?: number | string,
  unit?: string,
): number | undefined {
  const q = Number(quantity);
  if (!Number.isFinite(q) || q <= 0) {
    return undefined;
  }

  const normalizedUnit = String(unit ?? "").trim().toLowerCase();
  if (normalizedUnit === "g" || normalizedUnit === "gram" || normalizedUnit === "grams") {
    return q;
  }

  if (normalizedUnit === "oz" || normalizedUnit === "ounce" || normalizedUnit === "ounces") {
    return q * 28.3495;
  }

  return undefined;
}

function sanitizeItem(raw: FoodCatalogItem): FoodCatalogItem {
  return {
    id: String(raw.id),
    name: String(raw.name),
    brand: raw.brand ? String(raw.brand) : undefined,
    source: raw.source,
    caloriesPer100g: toNumber(raw.caloriesPer100g, 0),
    proteinPer100g: toNumber(raw.proteinPer100g, 0),
    carbsPer100g: toNumber(raw.carbsPer100g, 0),
    fatPer100g: toNumber(raw.fatPer100g, 0),
    servingSizeGrams: raw.servingSizeGrams ? toNumber(raw.servingSizeGrams, 0) : undefined,
    servingText: raw.servingText ? String(raw.servingText) : undefined,
    imageUrl: raw.imageUrl ? String(raw.imageUrl) : undefined,
  };
}

async function searchViaNodeProxy(query: string, pageSize: number): Promise<FoodCatalogItem[]> {
  if (!NUTRITION_API_BASE_URL) {
    return [];
  }

  const url =
    `${NUTRITION_API_BASE_URL}/api/foods/search` +
    `?q=${encodeURIComponent(query)}` +
    `&pageSize=${encodeURIComponent(String(pageSize))}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Nutrition proxy search failed (${response.status}).`);
  }

  const data = (await response.json()) as ProxySearchResponse;
  const items = Array.isArray(data.items) ? data.items : [];

  return items.map(sanitizeItem);
}

async function searchOpenFoodFactsDirect(query: string, pageSize: number): Promise<FoodCatalogItem[]> {
  const url =
    "https://world.openfoodfacts.org/cgi/search.pl" +
    `?search_terms=${encodeURIComponent(query)}` +
    "&search_simple=1&action=process&json=1" +
    `&page_size=${encodeURIComponent(String(pageSize))}` +
    "&fields=code,product_name,brands,serving_size,serving_quantity,serving_quantity_unit,quantity,nutriments,image_front_small_url";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Open Food Facts search failed (${response.status}).`);
  }

  const json = (await response.json()) as { products?: OpenFoodFactsProduct[] };
  const products = Array.isArray(json.products) ? json.products : [];

  return products
    .map<FoodCatalogItem | null>((product) => {
      const name = (product.product_name ?? "").trim();
      if (!name) {
        return null;
      }

      const nutriments = product.nutriments ?? {};
      const code = (product.code ?? "").trim();
      const servingFromText = parseServingSizeInGrams(product.serving_size);
      const servingFromQuantity = parseServingQuantityToGrams(
        product.serving_quantity,
        product.serving_quantity_unit,
      );
      const servingText =
        (product.serving_size ?? "").trim() ||
        (product.serving_quantity && product.serving_quantity_unit
          ? `${product.serving_quantity} ${product.serving_quantity_unit}`
          : "") ||
        (product.quantity ?? "").trim() ||
        undefined;

      return {
        id: code ? `off-${code}` : `off-${name.toLowerCase().replace(/\s+/g, "-")}`,
        name,
        brand: product.brands,
        source: "OpenFoodFacts",
        caloriesPer100g: toNumber(nutriments["energy-kcal_100g"], 0),
        proteinPer100g: toNumber(nutriments.proteins_100g, 0),
        carbsPer100g: toNumber(nutriments.carbohydrates_100g, 0),
        fatPer100g: toNumber(nutriments.fat_100g, 0),
        servingSizeGrams: servingFromText ?? servingFromQuantity,
        servingText,
        imageUrl: product.image_front_small_url,
      };
    })
    .filter((item): item is FoodCatalogItem => item !== null);
}

export async function searchFoodCatalog(input: FoodSearchRequest): Promise<FoodCatalogItem[]> {
  const query = input.query.trim();
  const pageSize = Math.max(5, Math.min(input.pageSize ?? 12, 20));

  if (query.length < 2) {
    return [];
  }

  try {
    const proxyItems = await searchViaNodeProxy(query, pageSize);
    if (proxyItems.length > 0) {
      return proxyItems;
    }
  } catch {
    // Fallback to direct Open Food Facts when proxy is down or not configured.
  }

  return searchOpenFoodFactsDirect(query, pageSize);
}