import { type User } from "firebase/auth/react-native";

export function needsPasswordSetup(user : User | null) {
    if (!user) return false;

    const hasGoogleProvided = user.providerData.some(
        (provider) => provider.providerId === "google.com"
    );

    const hasPasswordProvider = user.providerData.some(
        (provider) => provider.providerId === "password"
    );
    return hasGoogleProvided && !hasPasswordProvider;
}