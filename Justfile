host := `uname -a`

run:
  pnpm run dev

update:
  pnpm update

install:
  pnpm install

fmt:
  GLOBIGNORE=".:.." prettier --write 'app/**/*.{md,html,css,js,jsx,mjs,ts,tsx,json,yaml,yml}'
  pnpm exec eslint --fix app/
