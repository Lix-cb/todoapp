export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const data: Todo[] = [
  { id: 1, title: "Comprar víveres", completed: false },
  { id: 2, title: "Hacer la tarea de Expo", completed: false },
  { id: 3, title: "Estudiar AsyncStorage", completed: true },
  { id: 4, title: "Ir al gimnasio", completed: false },
  { id: 5, title: "Llamar a mamá", completed: true },
  { id: 6, title: "Leer documentación de Expo Router", completed: false },
  { id: 7, title: "Lavar la ropa", completed: false },
  { id: 8, title: "Preparar la presentación", completed: false },
];
