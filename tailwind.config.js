/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./app/**/*.{js,jsx}",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            screens: {
                xs: "380px",
            },
            maxWidth: {
                login: "29.16444rem",
                contact: "330px",
            },
            maxHeight: {
                login: "39.6439rem",
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },

                nav_bg: "#1d1e20",
                orange: "#a57efa",
                on_white_gray: "#ababab",
                on_white_gray_2: "#e9e9e9",

                profile_bg: "#1b1a32",
                black_accent_2: "#161425",
            },
            backgroundColor: {
                main: "#121316",
                primary: "#191a1d",
                accent_1: "#2a2b2d",
            },
            textColor: {
                heading: "#fff",
                accent_1: "#d0d0d0",
                accent_2: "#717173",
                accent_3: "#2a2b2d",
                text_on_navbg: "#78797a",
                message: "#080808",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                blink: {
                    "0%, 40%, 80%": { opacity: 1 },
                    " 20%, 60%, 100%": { opacity: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                blink: "blink 1s linear infinite reverse",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
