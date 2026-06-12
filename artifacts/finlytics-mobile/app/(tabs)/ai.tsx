import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I've analyzed your financial data for June. You're on track to exceed your revenue target by 12%. Would you like to see the breakdown or a cash flow forecast?",
    time: "10:00 AM",
  },
];

const suggestions = [
  "Cash balance next month?",
  "Top expense categories",
  "Highest LTV customers",
  "Q3 financial risks",
];

const insights = [
  {
    title: "Save $145/mo",
    desc: "3 unused SaaS seats in Design team",
    icon: "trending-down" as const,
    type: "saving",
  },
  {
    title: "$2.4k MRR opportunity",
    desc: "Up-sell Pro to top Free users",
    icon: "trending-up" as const,
    type: "growth",
  },
];

function MessageBubble({ msg }: { msg: Message }) {
  const colors = useColors();
  const isUser = msg.role === "user";
  return (
    <View style={[styles.msgRow, isUser && styles.msgRowUser]}>
      {!isUser && (
        <View style={[styles.botAvatar, { backgroundColor: colors.primary }]}>
          <Ionicons name="sparkles" size={14} color={colors.primaryForeground} />
        </View>
      )}
      <View
        style={[
          styles.bubble,
          isUser
            ? [styles.userBubble, { backgroundColor: colors.primary, borderRadius: colors.radius }]
            : [styles.botBubble, { backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: colors.radius }],
        ]}
      >
        <Text
          style={[
            styles.bubbleText,
            {
              color: isUser ? colors.primaryForeground : colors.foreground,
              fontFamily: "Inter_400Regular",
            },
          ]}
        >
          {msg.content}
        </Text>
        <Text
          style={[
            styles.bubbleTime,
            {
              color: isUser ? colors.primaryForeground : colors.mutedForeground,
              fontFamily: "Inter_400Regular",
              opacity: 0.7,
            },
          ]}
        >
          {msg.time}
        </Text>
      </View>
    </View>
  );
}

export default function AIScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : insets.bottom;
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [showInsights, setShowInsights] = useState(true);
  const listRef = useRef<FlatList>(null);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setShowInsights(false);
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm processing that analysis for you. Based on your current data, the trend looks positive and you're heading in the right direction...",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingTop: topPad + 16, borderBottomColor: colors.border, backgroundColor: colors.background },
        ]}
      >
        <View style={styles.headerLeft}>
          <View style={[styles.aiIcon, { backgroundColor: colors.primary, borderRadius: colors.radius / 2 }]}>
            <Ionicons name="sparkles" size={16} color={colors.primaryForeground} />
          </View>
          <View>
            <Text style={[styles.title, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              AI Analyst
            </Text>
            <Text style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Strategic AI
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Feather name="clock" size={22} color={colors.mutedForeground} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => <MessageBubble msg={item} />}
        contentContainerStyle={[
          styles.messagesList,
          { paddingBottom: 16 },
        ]}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          showInsights ? (
            <View style={{ paddingTop: 8, gap: 10 }}>
              <Text style={[styles.insightsLabel, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
                Strategic Insights
              </Text>
              {insights.map((ins, i) => (
                <View
                  key={i}
                  style={[
                    styles.insightCard,
                    { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius },
                  ]}
                >
                  <View style={[styles.insightIcon, { backgroundColor: colors.secondary, borderRadius: colors.radius / 2 }]}>
                    <Feather name={ins.icon} size={18} color={ins.type === "saving" ? colors.warning : colors.success} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.insightTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
                      {ins.title}
                    </Text>
                    <Text style={[styles.insightDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                      {ins.desc}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : null
        }
      />

      {/* Suggestions */}
      {messages.length < 3 && (
        <View style={[styles.suggestionsRow, { paddingHorizontal: 16, paddingBottom: 8 }]}>
          <FlatList
            horizontal
            data={suggestions}
            keyExtractor={(s) => s}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => send(item)}
                style={[
                  styles.suggestionChip,
                  {
                    backgroundColor: colors.secondary,
                    borderColor: colors.border,
                    borderRadius: 20,
                  },
                ]}
              >
                <Text style={[styles.suggestionText, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Input */}
      <View
        style={[
          styles.inputRow,
          {
            borderTopColor: colors.border,
            backgroundColor: colors.background,
            paddingBottom: bottomPad + 16,
          },
        ]}
      >
        <View
          style={[
            styles.inputBox,
            {
              backgroundColor: colors.secondary,
              borderColor: colors.border,
              borderRadius: 24,
            },
          ]}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask about your finances..."
            placeholderTextColor={colors.mutedForeground}
            style={[styles.input, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}
            multiline
            onSubmitEditing={() => send(input)}
          />
          <TouchableOpacity
            onPress={() => send(input)}
            style={[
              styles.sendBtn,
              {
                backgroundColor: input.trim() ? colors.primary : colors.border,
                borderRadius: 20,
              },
            ]}
          >
            <Feather name="send" size={16} color={input.trim() ? colors.primaryForeground : colors.mutedForeground} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  aiIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 20 },
  subtitle: { fontSize: 12 },
  messagesList: { paddingHorizontal: 16, paddingTop: 16 },
  msgRow: { flexDirection: "row", alignItems: "flex-end", marginBottom: 12, gap: 8 },
  msgRowUser: { justifyContent: "flex-end" },
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  bubble: { maxWidth: "80%", padding: 12, gap: 4 },
  userBubble: {},
  botBubble: { borderWidth: 1 },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTime: { fontSize: 11 },
  insightsLabel: { fontSize: 13, marginBottom: 4 },
  insightCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
    borderWidth: 1,
  },
  insightIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  insightTitle: { fontSize: 14, marginBottom: 2 },
  insightDesc: { fontSize: 12 },
  suggestionsRow: {},
  suggestionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
  },
  suggestionText: { fontSize: 13 },
  inputRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    borderWidth: 1,
    gap: 8,
  },
  input: { flex: 1, fontSize: 14, maxHeight: 80 },
  sendBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});
