export const Colors = {
  light: {
    text: "black",
    background: "white",
    icon: "black",
    button: "royalblue",
    danger: "#ef4444",
    border: "#cbd5e1",
    input: "#ffffff",
    inputBorder: "#94a3b8",
    placeholder: "#94a3b8",
  },
  dark: {
    text: "white",
    background: "black",
    icon: "red",
    button: "white",
    danger: "#ef4444",
    border: "#334155",
    input: "#0f172a",
    inputBorder: "#475569",
    placeholder: "#64748b",
  },
};

export type Theme = typeof Colors.light;
