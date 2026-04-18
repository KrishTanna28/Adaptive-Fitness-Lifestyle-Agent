import metDatasetRaw from "../met.json";
import { toText } from "./helperFunctions";

export type MetIntensity = "low" | "moderate" | "vigorous";

export type MetDatasetRow = {
  id: string;
  activity: string;
  category: string;
  aliases: string[];
  tags: string[];
  intensityHint: MetIntensity | null;
  metSingle: number | null;
  metLow: number | null;
  metModerate: number | null;
  metVigorous: number | null;
};

type DatasetEnvelope = {
  version?: unknown;
  rows?: unknown;
};

const CACHE_TTL_MS = 60 * 60 * 1000;

let cacheRows: MetDatasetRow[] | null = null;
let cacheVersion = "local-met-json";
let cacheAt = 0;

function toOptionalNumber(value: unknown): number | null {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return null;
  return n;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((entry) => toText(entry)).filter(Boolean);
}

function normalizeIntensity(value: unknown): MetIntensity | null {
  const v = toText(value).toLowerCase();
  if (v === "low" || v === "light") return "low";
  if (v === "moderate" || v === "medium") return "moderate";
  if (v === "vigorous" || v === "high") return "vigorous";
  return null;
}

function pickNumber(raw: Record<string, unknown>, keys: string[]): number | null {
  for (const key of keys) {
    const n = toOptionalNumber(raw[key]);
    if (n !== null) return n;
  }
  return null;
}

function normalizeRow(raw: unknown, index: number): MetDatasetRow | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;

  const id =
    toText(row.id) ||
    toText(row.code) ||
    toText(row.Code) ||
    "row-" + String(index);

  const activity =
    toText(row.activity) ||
    toText(row.description) ||
    toText(row.Description) ||
    toText(row.name);

  if (!activity) return null;

  return {
    id,
    activity,
    category:
      toText(row.category) ||
      toText(row.Actvitiy) || // CSV typo key in your JSON
      toText(row.Activity) ||
      "general",
    aliases: toStringArray(row.aliases),
    tags: toStringArray(row.tags),
    intensityHint: normalizeIntensity(row.intensity ?? row.Intensity),
    metSingle: pickNumber(row, ["met", "met_value", "mets", "MET"]),
    metLow: pickNumber(row, ["metLow", "met_low", "METLow"]),
    metModerate: pickNumber(row, ["metModerate", "met_moderate", "METModerate"]),
    metVigorous: pickNumber(row, ["metVigorous", "met_vigorous", "METVigorous"]),
  };
}

function parseDataset(json: unknown): { version: string; rows: MetDatasetRow[] } {
  let version = "local-met-json";
  let rawRows: unknown[] = [];

  if (Array.isArray(json)) {
    rawRows = json;
  } else if (json && typeof json === "object") {
    const envelope = json as DatasetEnvelope;
    version = toText(envelope.version) || version;
    if (Array.isArray(envelope.rows)) {
      rawRows = envelope.rows;
    }
  }

  const rows = rawRows
    .map((row, index) => normalizeRow(row, index))
    .filter((row): row is MetDatasetRow => row !== null);

  return { version, rows };
}

function loadFromLocal(): { version: string; rows: MetDatasetRow[] } {
  const parsed = parseDataset(metDatasetRaw as unknown);
  if (parsed.rows.length === 0) {
    throw new Error("Local MET dataset is empty or invalid.");
  }
  return parsed;
}

export async function getMetDataset(forceRefresh = false): Promise<{ version: string; rows: MetDatasetRow[] }> {
  const now = Date.now();
  const valid =
    !forceRefresh &&
    Array.isArray(cacheRows) &&
    cacheRows.length > 0 &&
    now - cacheAt < CACHE_TTL_MS;

  if (valid && cacheRows) {
    return { version: cacheVersion, rows: cacheRows };
  }

  const loaded = loadFromLocal();
  cacheRows = loaded.rows;
  cacheVersion = loaded.version;
  cacheAt = now;

  return loaded;
}

export function pickMetForIntensity(row: MetDatasetRow, intensity: MetIntensity): number | null {
  if (row.metLow !== null || row.metModerate !== null || row.metVigorous !== null) {
    if (intensity === "low") return row.metLow ?? row.metModerate ?? row.metVigorous;
    if (intensity === "moderate") return row.metModerate ?? row.metLow ?? row.metVigorous;
    return row.metVigorous ?? row.metModerate ?? row.metLow;
  }

  if (row.metSingle === null) {
    return null;
  }

  // Most local rows only provide one MET value; apply intensity scaling so user choice
  // still affects calorie output when split low/moderate/vigorous values are unavailable.
  const factor =
    intensity === "low"
      ? 0.7
      : intensity === "vigorous"
        ? 1.3
        : 1;

  return Number((row.metSingle * factor).toFixed(3));
}