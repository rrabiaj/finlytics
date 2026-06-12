import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

const invoices = [
  { id: "INV-001", client: "Acme Corp", amount: "$4,200", status: "Pending", date: "2024-07-15", initials: "AC" },
  { id: "INV-002", client: "Global Tech", amount: "$12,500", status: "Overdue", date: "2024-07-01", initials: "GT" },
  { id: "INV-003", client: "Stripe Inc", amount: "$8,900", status: "Paid", date: "2024-06-28", initials: "SI" },
  { id: "INV-004", client: "Notion HQ", amount: "$3,100", status: "Paid", date: "2024-06-20", initials: "NH" },
  { id: "INV-005", client: "Vercel Co", amount: "$6,400", status: "Pending", date: "2024-07-20", initials: "VC" },
];

const expenses = [
  { name: "AWS Cloud Services", category: "Infrastructure", amount: "$2,340", date: "Jul 10", icon: "server" as const },
  { name: "Office Rent", category: "Facilities", amount: "$4,500", date: "Jul 1", icon: "home" as const },
  { name: "Figma Teams", category: "Software", amount: "$45", date: "Jul 5", icon: "layers" as const },
  { name: "Team Meals", category: "Food", amount: "$380", date: "Jul 12", icon: "coffee" as const },
  { name: "LinkedIn Ads", category: "Marketing", amount: "$1,200", date: "Jul 8", icon: "trending-up" as const },
];

type Tab = "invoices" | "expenses";

function StatusBadge({ status }: { status: string }) {
  const colors = useColors();
  const bg =
    status === "Paid" ? "#dcfce7" :
    status === "Overdue" ? "#fee2e2" :
    colors.secondary;
  const fg =
    status === "Paid" ? colors.success :
    status === "Overdue" ? colors.destructive :
    colors.warning;
  return (
    <View style={[styles.badge, { backgroundColor: bg, borderRadius: 12 }]}>
      <Text style={[styles.badgeText, { color: fg, fontFamily: "Inter_500Medium" }]}>
        {status}
      </Text>
    </View>
  );
}

export default function FinanceScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : 0;
  const [activeTab, setActiveTab] = useState<Tab>("invoices");

  const totalPaid = invoices.filter((i) => i.status === "Paid").reduce((a) => a + 1, 0);
  const totalPending = invoices.filter((i) => i.status === "Pending").length;
  const totalOverdue = invoices.filter((i) => i.status === "Overdue").length;

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
          Finance
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
        {/* Summary Cards */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <View
            style={[
              styles.summaryCard,
              { backgroundColor: colors.primary, borderRadius: colors.radius },
            ]}
          >
            <Text style={[styles.summaryLabel, { color: colors.primaryForeground, opacity: 0.7, fontFamily: "Inter_400Regular" }]}>
              Total Revenue
            </Text>
            <Text style={[styles.summaryValue, { color: colors.primaryForeground, fontFamily: "Inter_700Bold" }]}>
              $124,592
            </Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryItemVal, { color: colors.primaryForeground, fontFamily: "Inter_600SemiBold" }]}>
                  {totalPaid} Paid
                </Text>
              </View>
              <View style={[styles.divider, { backgroundColor: colors.primaryForeground, opacity: 0.2 }]} />
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryItemVal, { color: colors.primaryForeground, fontFamily: "Inter_600SemiBold" }]}>
                  {totalPending} Pending
                </Text>
              </View>
              <View style={[styles.divider, { backgroundColor: colors.primaryForeground, opacity: 0.2 }]} />
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryItemVal, { color: "#fca5a5", fontFamily: "Inter_600SemiBold" }]}>
                  {totalOverdue} Overdue
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <View
            style={[
              styles.tabBar,
              { backgroundColor: colors.secondary, borderRadius: colors.radius },
            ]}
          >
            {(["invoices", "expenses"] as Tab[]).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tab,
                  activeTab === tab && [
                    styles.activeTab,
                    { backgroundColor: colors.background, borderRadius: colors.radius - 2 },
                  ],
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: activeTab === tab ? colors.foreground : colors.mutedForeground,
                      fontFamily: activeTab === tab ? "Inter_600SemiBold" : "Inter_400Regular",
                    },
                  ]}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 16, marginTop: 12, gap: 10 }}>
          {activeTab === "invoices"
            ? invoices.map((inv) => (
                <TouchableOpacity
                  key={inv.id}
                  style={[
                    styles.row,
                    { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius },
                  ]}
                >
                  <View style={[styles.rowIcon, { backgroundColor: colors.secondary, borderRadius: colors.radius / 2 }]}>
                    <Text style={[styles.initials, { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" }]}>
                      {inv.initials}
                    </Text>
                  </View>
                  <View style={styles.rowInfo}>
                    <Text style={[styles.rowName, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
                      {inv.client}
                    </Text>
                    <Text style={[styles.rowSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                      {inv.id} · {inv.date}
                    </Text>
                  </View>
                  <View style={styles.rowRight}>
                    <Text style={[styles.rowAmount, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
                      {inv.amount}
                    </Text>
                    <StatusBadge status={inv.status} />
                  </View>
                </TouchableOpacity>
              ))
            : expenses.map((exp, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.row,
                    { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius },
                  ]}
                >
                  <View style={[styles.rowIcon, { backgroundColor: colors.secondary, borderRadius: colors.radius / 2 }]}>
                    <Feather name={exp.icon} size={18} color={colors.mutedForeground} />
                  </View>
                  <View style={styles.rowInfo}>
                    <Text style={[styles.rowName, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
                      {exp.name}
                    </Text>
                    <Text style={[styles.rowSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                      {exp.category} · {exp.date}
                    </Text>
                  </View>
                  <Text style={[styles.rowAmount, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
                    {exp.amount}
                  </Text>
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
  summaryCard: { padding: 20 },
  summaryLabel: { fontSize: 13, marginBottom: 4 },
  summaryValue: { fontSize: 32, marginBottom: 16 },
  summaryRow: { flexDirection: "row", alignItems: "center" },
  summaryItem: { flex: 1, alignItems: "center" },
  summaryItemVal: { fontSize: 13 },
  divider: { width: 1, height: 20 },
  tabBar: {
    flexDirection: "row",
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 8, alignItems: "center" },
  activeTab: {},
  tabText: { fontSize: 14 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    gap: 12,
  },
  rowIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: { fontSize: 14 },
  rowInfo: { flex: 1, gap: 3 },
  rowName: { fontSize: 14 },
  rowSub: { fontSize: 12 },
  rowRight: { alignItems: "flex-end", gap: 4 },
  rowAmount: { fontSize: 15 },
  badge: { paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 11 },
});
