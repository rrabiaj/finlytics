import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

const profileSections = [
  {
    title: "Account",
    items: [
      { icon: "user" as const, label: "Profile", value: "John Doe" },
      { icon: "mail" as const, label: "Email", value: "john@finlytics.com" },
      { icon: "briefcase" as const, label: "Organization", value: "Finlytics Inc." },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: "globe" as const, label: "Currency", value: "USD" },
      { icon: "calendar" as const, label: "Fiscal Year", value: "Jan – Dec" },
      { icon: "clock" as const, label: "Timezone", value: "EST" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { icon: "bell" as const, label: "Invoice Due Alerts", toggle: true, toggled: true },
      { icon: "trending-up" as const, label: "Weekly Reports", toggle: true, toggled: true },
      { icon: "alert-circle" as const, label: "Overdue Reminders", toggle: true, toggled: false },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: "help-circle" as const, label: "Help Center", arrow: true },
      { icon: "file-text" as const, label: "Privacy Policy", arrow: true },
      { icon: "shield" as const, label: "Terms of Service", arrow: true },
    ],
  },
];

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : 0;

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Invoice Due Alerts": true,
    "Weekly Reports": true,
    "Overdue Reminders": false,
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{
        paddingTop: topPad + 16,
        paddingBottom: bottomPad + 100,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Card */}
      <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
        <View
          style={[
            styles.profileCard,
            { backgroundColor: colors.primary, borderRadius: colors.radius },
          ]}
        >
          <View style={[styles.avatar, { backgroundColor: "rgba(255,255,255,0.15)" }]}>
            <Text style={[styles.avatarText, { color: colors.primaryForeground, fontFamily: "Inter_700Bold" }]}>
              JD
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.primaryForeground, fontFamily: "Inter_700Bold" }]}>
              John Doe
            </Text>
            <Text style={[styles.profileEmail, { color: colors.primaryForeground, fontFamily: "Inter_400Regular", opacity: 0.7 }]}>
              john@finlytics.com
            </Text>
            <View style={[styles.planBadge, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
              <Text style={[styles.planText, { color: colors.primaryForeground, fontFamily: "Inter_600SemiBold" }]}>
                Professional Plan
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Feather name="edit-2" size={18} color={colors.primaryForeground} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Sections */}
      {profileSections.map((section) => (
        <View key={section.title} style={{ paddingHorizontal: 16, marginBottom: 20 }}>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
            {section.title.toUpperCase()}
          </Text>
          <View
            style={[
              styles.sectionCard,
              { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius },
            ]}
          >
            {section.items.map((item, i) => (
              <View
                key={item.label}
                style={[
                  styles.settingRow,
                  i < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                ]}
              >
                <View style={[styles.settingIconWrap, { backgroundColor: colors.secondary, borderRadius: 8 }]}>
                  <Feather name={item.icon} size={16} color={colors.mutedForeground} />
                </View>
                <Text style={[styles.settingLabel, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}>
                  {item.label}
                </Text>
                {item.toggle ? (
                  <Switch
                    value={toggles[item.label]}
                    onValueChange={(v) => setToggles((prev) => ({ ...prev, [item.label]: v }))}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={colors.background}
                  />
                ) : item.arrow ? (
                  <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
                ) : (
                  <Text style={[styles.settingValue, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                    {(item as any).value}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Sign Out */}
      <View style={{ paddingHorizontal: 16 }}>
        <TouchableOpacity
          style={[
            styles.signOutBtn,
            { borderColor: colors.destructive, borderRadius: colors.radius },
          ]}
        >
          <Feather name="log-out" size={18} color={colors.destructive} />
          <Text style={[styles.signOutText, { color: colors.destructive, fontFamily: "Inter_600SemiBold" }]}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>

      {/* Version */}
      <Text style={[styles.version, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
        Finlytics Mobile v1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 18 },
  profileInfo: { flex: 1, gap: 4 },
  profileName: { fontSize: 18 },
  profileEmail: { fontSize: 13 },
  planBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  planText: { fontSize: 12 },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  sectionCard: { borderWidth: 1, overflow: "hidden" },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 14,
    gap: 12,
  },
  settingIconWrap: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  settingLabel: { flex: 1, fontSize: 15 },
  settingValue: { fontSize: 14 },
  signOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderWidth: 1,
    gap: 10,
  },
  signOutText: { fontSize: 16 },
  version: { textAlign: "center", fontSize: 12, marginTop: 24 },
});
