export const theme = {
  color: {
    black: "#495057",
    gray: "#F7F7F7",
    primary: "#F15A25",
    primary_disabled: "#E9BCAC",
    background: "#D6DBDC", // screen background
    gray01: "#C2CBCD",
    gray02: "#B7C6CD",
    gray03: "#A3B3BA",
    gray04: "#717D82",
    gray05: "#5A676A",
    gray06: "#2D2D2D", // main article text
    gray_toast: "#424b4d",
    dim01: "rgba(0, 0, 0, 0.1)", // main thumnail tag background
    dim02: "rgba(0, 0, 0, 0.2)",
    dim03: "rgba(0, 0, 0, 0.6)", //screen dim
    alert: "#E9412b",
  },
  borderRadius: {
    default: "4px",
    outer: "6px",
  },
  size: {
    maxWidth: "480px",
    layoutPadding: "0 16px",
  },
  font: {
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
    },
  },
};

export type Theme = typeof theme;

export type ThemeColor = keyof typeof theme.color;
