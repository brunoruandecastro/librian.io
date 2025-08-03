const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#7B4E2D", // marrom escuro principal
        background: "#1C1A17", // fundo geral escuro
        surface: "#2C2621", // áreas de conteúdo (cards, forms)
        text: "#EDE6DD", // texto principal claro
        "text-secondary": "#C4B7A6", // texto secundário
        border: "#3D352F", // bordas
        muted: "#514437", // divisores ou tons neutros
      },
    },
  },
  plugins: [],
}
export default config