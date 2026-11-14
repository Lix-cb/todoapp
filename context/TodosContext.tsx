import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/constants/Storage";
import { data, Todo } from "@/data/todos";

type TodosContextValue = {
  todos: Todo[];
  loaded: boolean;
  addTodo: (title: string) => void;
  updateTodo: (id: number, title: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

export const TodosContext = createContext<TodosContextValue | null>(null);

const sortByIdDesc = (list: Todo[]) => [...list].sort((a, b) => b.id - a.id);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.todos);
        const storageTodos: Todo[] | null =
          jsonValue != null ? JSON.parse(jsonValue) : null;

        if (cancelled) return;

        setTodos(
          sortByIdDesc(storageTodos && storageTodos.length ? storageTodos : data),
        );
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(STORAGE_KEYS.todos, JSON.stringify(todos)).catch(
      console.error,
    );
  }, [todos, loaded]);

  const addTodo = (title: string) => {
    setTodos((current) => {
      const nextId = current.length
        ? Math.max(...current.map((t) => t.id)) + 1
        : 1;
      return sortByIdDesc([...current, { id: nextId, title, completed: false }]);
    });
  };

  const updateTodo = (id: number, title: string) => {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const toggleTodo = (id: number) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodo = (id: number) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return (
    <TodosContext.Provider
      value={{ todos, loaded, addTodo, updateTodo, toggleTodo, removeTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
}
