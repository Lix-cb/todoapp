import { Link } from "expo-router";
import Check from "lucide-react-native/icons/check";
import RotateCcw from "lucide-react-native/icons/rotate-ccw";
import Trash2 from "lucide-react-native/icons/trash-2";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Theme } from "@/constants/Colors";
import { Todo } from "@/data/todos";
import { useTheme } from "@/hooks/useTheme";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};

export default function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Link
        href={{ pathname: "/details/[id]", params: { id: String(todo.id) } }}
        asChild
      >
        <Pressable style={styles.titleButton}>
          <Text style={[styles.title, todo.completed && styles.completed]}>
            {todo.title}
          </Text>
        </Pressable>
      </Link>
      <Pressable onPress={() => onToggle(todo.id)} style={styles.iconButton}>
        {todo.completed ? (
          <RotateCcw size={20} color={theme.icon} />
        ) : (
          <Check size={20} color={theme.icon} />
        )}
      </Pressable>
      <Pressable onPress={() => onRemove(todo.id)} style={styles.iconButton}>
        <Trash2 size={20} color={theme.danger} />
      </Pressable>
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    titleButton: { flex: 1 },
    title: { fontSize: 18, color: theme.text },
    completed: { textDecorationLine: "line-through", opacity: 0.5 },
    iconButton: { paddingHorizontal: 6 },
  });
}
