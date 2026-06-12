import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

const customers = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "Active", ltv: "$12,400", tags: ["VIP", "Enterprise"], initials: "AJ" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", status: "Inactive", ltv: "$8,900", tags: ["Legacy"], initials: "BS" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", status: "Active", ltv: "$45,000", tags: ["VIP", "High Value"], initials: "CB" },
  { id: "4", name: "David Miller", email: "david@example.com", status: "Active", ltv: "$22,100", tags: ["Fast Growth"], initials: "DM" },
  { id: "5", name: "Emma Wilson", email: "emma@example.com", status: "Active", ltv: "$18,700", tags: ["Enterprise"], initials: "EW" },
  { id: "6", name: "Frank Davis", email: "frank@example.com", status: "Inactive", ltv: "$3,200", tags: [], initials: "FD" },
];

const stats = [
  { label: "Total", value: "1,248", icon: "users" as const },
  { label: "Active", value: "982", icon: "user-check" as const },
  { label: "Leads", value: "134", icon: "target" as const },
];

export default function CRMScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : 0;
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingTop: topPad + 16, borderBottomColor: colors.border, backgroundColor: colors.background },
        ]}
      >
        <Text style={[styles.title, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          CRM
        </Text>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: colors.primary, borderRadius: colors.radius }]}
        >
          <Feather name="plus" size={18} color={colors.primaryForeground} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPad + 100 }}
      >
        {/* Stats Row */}
        <View style={[styles.statsRow, { paddingHorizontal: 16, paddingTop: 16 }]}>
          {stats.map((s, i) => (
            <View
              key={i}
              style={[
                styles.statCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderRadius: colors.radius,
                },
              ]}
            >
              <Feather name={s.icon} size={18} color={colors.mutedForeground} />
              <Text style={[styles.statValue, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
                {s.value}
              </Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                {s.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Search */}
        <View style={[styles.searchRow, { paddingHorizontal: 16, marginTop: 16 }]}>
          <View
            style={[
              styles.searchBox,
              {
                backgroundColor: colors.secondary,
                borderColor: colors.border,
                borderRadius: colors.radius,
              },
            ]}
          >
            <Feather name="search" size={16} color={colors.mutedForeground} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search customers..."
              placeholderTextColor={colors.mutedForeground}
              style={[styles.searchInput, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}
            />
          </View>
        </View>

        {/* Customer List */}
        <View style={{ paddingHorizontal: 16, marginTop: 16, gap: 10 }}>
          {filtered.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[
                styles.customerCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderRadius: colors.radius,
                },
              ]}
            >
              <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                <Text style={[styles.avatarText, { color: colors.primaryForeground, fontFamily: "Inter_600SemiBold" }]}>
                  {c.initials}
                </Text>
              </View>
              <View style={styles.customerInfo}>
                <View style={styles.customerTop}>
                  <Text style={[styles.customerName, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
                    {c.name}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          c.status === "Active" ? "#dcfce7" : colors.secondary,
                        borderRadius: 12,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color: c.status === "Active" ? colors.success : colors.mutedForeground,
                          fontFamily: "Inter_500Medium",
                        },
                      ]}
                    >
                      {c.status}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.customerEmail, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                  {c.email}
                </Text>
                <View style={styles.customerBottom}>
                  <Text style={[styles.ltvText, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
                    LTV {c.ltv}
                  </Text>
                  <View style={styles.tagsRow}>
                    {c.tags.slice(0, 2).map((tag, ti) => (
                      <View
                        key={ti}
                        style={[
                          styles.tag,
                          { backgroundColor: colors.secondary, borderRadius: 4 },
                        ]}
                      >
                        <Text style={[styles.tagText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  title: { fontSize: 28 },
  addBtn: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: { flexDirection: "row", gap: 10 },
  statCard: {
    flex: 1,
    padding: 14,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
  },
  statValue: { fontSize: 20 },
  statLabel: { fontSize: 11 },
  searchRow: {},
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 14 },
  customerCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 14 },
  customerInfo: { flex: 1, gap: 4 },
  customerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  customerName: { fontSize: 14 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3 },
  statusText: { fontSize: 11 },
  customerEmail: { fontSize: 12 },
  customerBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  ltvText: { fontSize: 13 },
  tagsRow: { flexDirection: "row", gap: 4 },
  tag: { paddingHorizontal: 6, paddingVertical: 2 },
  tagText: { fontSize: 10 },
});
