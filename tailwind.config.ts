import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "nova-navy": "#163A70",
        "nova-blue": "#2E7BC6",
        "nova-horizon": "#DCE7F7",
        "nova-sand": "#F8F7F4",
        "nova-sage": "#8FAFA8",
        "nova-text": "#5E6B7E",
        "nova-ink": "#243041"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(22, 58, 112, 0.08)",
        card: "0 12px 40px rgba(22, 58, 112, 0.10)"
      },
      borderRadius: {
        "2xl": "1.25rem"
      },
      maxWidth: {
        container: "1200px"
      }
    }
  },
  plugins: []
};

export default config;