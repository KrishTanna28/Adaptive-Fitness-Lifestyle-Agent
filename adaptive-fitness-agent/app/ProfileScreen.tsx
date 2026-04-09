import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { User } from "firebase/auth/react-native";

import AppCard from "../components/ui/AppCard";
import { globalStyles } from "../theme/globalStyles";
import { styles } from "./ProfileScreen.styles";

type ProfileScreenProps = {
  user: User;
};

export default function ProfileScreen({ user }: ProfileScreenProps) {
  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppCard style={styles.headerCard}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>Your account details</Text>
          </AppCard>

          <AppCard style={styles.detailsCard}>
            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{user.displayName || "Not set"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user.email || "Not available"}</Text>
            </View>
          </AppCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}