const config = {
  '*.{jsx,ts,tsx}': ['pnpm run lint:eslint', 'pnpm run format'],
  '*.{css,scss}': ['pnpm run format', 'pnpm run stylelint'],
  '*.{json,html,md,mdx,yml}': ['pnpm run format'],
}

export default config
