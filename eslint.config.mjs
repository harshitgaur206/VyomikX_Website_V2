import nextConfig from "eslint-config-next"

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [".next/**", "node_modules/**", "public/**", "scratch/**"],
  },
  {
    rules: {
      // Flags standard, correct patterns (hydration mount-guards, route-change
      // cleanup, fetch loading state) as errors; keep it visible without blocking CI.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]

export default eslintConfig
