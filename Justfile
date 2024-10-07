host := `uname -a`

run:
  pnpm run dev

update:
  pnpm update

install:
  pnpm install

fmt:
  prettier --write '**/*.{md,html,css,js,jsx,mjs,ts,tsx,json,yaml,yml}'
