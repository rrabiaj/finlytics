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

const revenueData = [
  { month: "Jan", revenue: 45, expenses: 32 },
  { month: "Feb", revenue: 52, expenses: 34 },
  { month: "Mar", revenue: 48, expenses: 35 },
  { month: "Apr", revenue: 61, expenses: 40 },
  { month: "May", revenue: 55, expenses: 38 },
  { month: "Jun", revenue: 67, expenses: 42 },
  { month: "Jul", revenue: 72, expenses: 45 },
];

const maxVal = 80;

const kpis = [
  { title: "Revenue", value: "$124,592", change: "+12.5%", up: true, icon: "dollar-sign" as const },
  { title: "Customers", value: "1,248", change: "+48 new", up: true, icon: "users" as const },
  { title: "Expenses", value: "$42,300", change: "+2.1%", up: false, icon: "trending-down" as const },
  { title: "Net Profit", value: "$82,292", change: "+15.2%", up: true, icon: "trending-up" as const },
];

const invoices = [
  { name: "Acme Corp", due: "Due Tomorrow", amount: "$4,200", urgent: true },
  { name: "Global Tech", due: "Overdue", amount: "$12,500", urgent: true, overdue: true },
  { name: "Stripe Inc", due: "Due in 3 days", amount: "$8,900", urgent: false },
];

function MiniBarChart() {
  const colors = useColors();
  return (
    <View style={styles.chartContainer}>
      {revenueData.map((d, i) => (
        <View key={i} style={styles.barGroup}>
          <View style={styles.barsRow}>
            <View
              style={[
                styles.bar,
                {
                  height: (d.revenue / maxVal) * 80,
                  backgroundColor: colors.primary,
                  borderRadius: 3,
                },
              ]}
            />
            <View
              style={[
                styles.bar,
                {
                  height: (d.expenses / maxVal) * 80,
                  backgroundColor: colors.border,
                  borderRadius: 3,
                },
              ]}
            />
          </View>
          <Text style={[styles.barLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            {d.month}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default function DashboardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : 0;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{
        paddingTop: topPad + 16,
        paddingBottom: bottomPad + 100,
        paddingHorizontal: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            Good morning,
          </Text>
          <Text style={[styles.name, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            John Doe
          </Text>
        </View>
        <View style={[styles.notifBadge, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <Feather name="bell" size={20} color={colors.foreground} />
          <View style={[styles.dot, { backgroundColor: colors.destructive }]} />
        </View>
      </View>

      {/* KPI Grid */}
      <View style={styles.kpiGrid}>
        {kpis.map((kpi, i) => (
          <View
            key={i}
            style={[
              styles.kpiCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: colors.radius,
              },
            ]}
          >
            <View style={styles.kpiTop}>
              <Text style={[styles.kpiTitle, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
                {kpi.title}
              </Text>
              <Feather name={kpi.icon} size={16} color={colors.mutedForeground} />
            </View>
            <Text style={[styles.kpiValue, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              {kpi.value}
            </Text>
            <Text
              style={[
                styles.kpiChange,
                {
                  color: kpi.up ? colors.success : colors.destructive,
                  fontFamily: "Inter_500Medium",
                },
              ]}
            >
              {kpi.change}
            </Text>
          </View>
        ))}
      </View>

      {/* Revenue Chart */}
      <View
        style={[
          styles.section,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: colors.radius,
          },
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
            Revenue vs Expenses
          </Text>
          <Text style={[styles.sectionSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            Last 7 months
          </Text>
        </View>
        <MiniBarChart />
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.legendLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Revenue
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.border }]} />
            <Text style={[styles.legendLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Expenses
            </Text>
          </View>
        </View>
      </View>

      {/* Upcoming Invoices */}
      <View
        style={[
          styles.section,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: colors.radius,
          },
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
            Upcoming Invoices
          </Text>
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color: colors.primary, fontFamily: "Inter_500Medium" }]}>
              View all
            </Text>
          </TouchableOpacity>
        </View>
        {invoices.map((inv, i) => (
          <View
            key={i}
            style={[
              styles.invoiceRow,
              i < invoices.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
          >
            <View style={[styles.invoiceIcon, { backgroundColor: inv.overdue ? "#fee2e2" : colors.secondary, borderRadius: colors.radius / 2 }]}>
              <Feather
                name="file-text"
                size={16}
                color={inv.overdue ? colors.destructive : colors.mutedForeground}
              />
            </View>
            <View style={styles.invoiceInfo}>
              <Text style={[styles.invoiceName, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
                {inv.name}
              </Text>
              <Text
                style={[
                  styles.invoiceDue,
                  {
                    color: inv.overdue ? colors.destructive : colors.mutedForeground,
                    fontFamily: "Inter_400Regular",
                  },
                ]}
              >
                {inv.due}
              </Text>
            </View>
            <Text style={[styles.invoiceAmount, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              {inv.amount}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: { fontSize: 14, marginBottom: 2 },
  name: { fontSize: 24 },
  notifBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  dot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  kpiCard: {
    width: "47.5%",
    padding: 14,
    borderWidth: 1,
  },
  kpiTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  kpiTitle: { fontSize: 12 },
  kpiValue: { fontSize: 20, marginBottom: 4 },
  kpiChange: { fontSize: 12 },
  section: {
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 16 },
  sectionSub: { fontSize: 12 },
  viewAll: { fontSize: 13 },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 100,
    marginBottom: 12,
  },
  barGroup: { alignItems: "center", flex: 1 },
  barsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    flex: 1,
  },
  bar: { width: 8 },
  barLabel: { fontSize: 9, marginTop: 4 },
  legend: { flexDirection: "row", gap: 16, justifyContent: "center" },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { fontSize: 12 },
  invoiceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  invoiceIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  invoiceInfo: { flex: 1 },
  invoiceName: { fontSize: 14, marginBottom: 2 },
  invoiceDue: { fontSize: 12 },
  invoiceAmount: { fontSize: 15 },
});
