import Moon from "lucide-react-native/icons/moon";
import Sun from "lucide-react-native/icons/sun";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TodoItem from "@/components/TodoItem";
import { Theme } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { useTodos } from "@/hooks/useTodos";

export default function Index() {
  const { colorScheme, theme, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    addTodo(text.trim());
    setText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add a new todo"
          placeholderTextColor={theme.placeholder}
          onSubmitEditing={handleAdd}
        />
        <Pressable style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={toggleTheme}>
          {colorScheme === "dark" ? (
            <Sun size={20} color={theme.background} />
          ) : (
            <Moon size={20} color={theme.background} />
          )}
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(todo) => String(todo.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={toggleTodo} onRemove={removeTodo} />
        )}
      />
    </SafeAreaView>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      padding: 12,
    },
    input: {
      flex: 1,
      minWidth: 0,
      height: 44,
      borderWidth: 1,
      borderColor: theme.inputBorder,
      borderRadius: 8,
      paddingHorizontal: 12,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.input,
    },
    button: {
      backgroundColor: theme.button,
      paddingHorizontal: 12,
      height: 44,
      justifyContent: "center",
      borderRadius: 8,
    },
    buttonText: { color: theme.background, fontSize: 16, fontWeight: "bold" },
    list: { paddingHorizontal: 12 },
  });
}
