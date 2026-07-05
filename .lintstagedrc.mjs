export default {
  '*.{js,jsx,ts,tsx,mjs}': ['eslint --fix'],
  '*.{ts,tsx}': () => 'tsc --noEmit',
};
