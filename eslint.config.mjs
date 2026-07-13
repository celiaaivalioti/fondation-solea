import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: ["dist/**", "out/**", ".next/**", "node_modules/**", "tmp/**"]
  }
];

export default eslintConfig;
