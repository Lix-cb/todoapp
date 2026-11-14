import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Theme } from "@/constants/Colors";
import { Todo } from "@/data/todos";
import { useTheme } from "@/hooks/useTheme";
import { useTodos } from "@/hooks/useTodos";

export default function TodoDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { todos, loaded } = useTodos();

  if (!loaded) return <View style={styles.container} />;

  const todo = todos.find((item) => item.id === Number(id));

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Todo not found.</Text>
      </View>
    );
  }

  return <TodoEditor todo={todo} styles={styles} theme={theme} />;
}

type TodoEditorProps = {
  todo: Todo;
  styles: ReturnType<typeof createStyles>;
  theme: Theme;
};

function TodoEditor({ todo, styles, theme }: TodoEditorProps) {
  const { updateTodo, toggleTodo, removeTodo } = useTodos();
  const [title, setTitle] = useState(todo.title);

  const handleSave = () => {
    if (!title.trim()) return;
    updateTodo(todo.id, title.trim());
    router.back();
  };

  const handleRemove = () => {
    removeTodo(todo.id);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Todo title"
        placeholderTextColor={theme.placeholder}
        onSubmitEditing={handleSave}
      />

      <Text style={styles.label}>
        Status: {todo.completed ? "Completed" : "Pending"}
      </Text>

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => toggleTodo(todo.id)}>
        <Text style={styles.buttonText}>
          {todo.completed ? "Mark as pending" : "Mark as completed"}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.dangerButton]}
        onPress={handleRemove}
      >
        <Text style={[styles.buttonText, styles.dangerText]}>Delete</Text>
      </Pressable>
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: theme.background },
    label: { fontSize: 16, color: theme.text, marginBottom: 8 },
    input: {
      height: 44,
      borderWidth: 1,
      borderColor: theme.inputBorder,
      borderRadius: 8,
      paddingHorizontal: 12,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.input,
      marginBottom: 16,
    },
    button: {
      backgroundColor: theme.button,
      height: 44,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      marginTop: 12,
    },
    buttonText: { color: theme.background, fontSize: 16, fontWeight: "bold" },
    dangerButton: { backgroundColor: theme.danger },
    dangerText: { color: "white" },
  });
}
