host := `uname -a`

run:
  pnpm run dev

update:
  pnpm update

install:
  pnpm install

fmt:
  prettier --write '**/*.{html,css,js,jsx,ts,tsx,json,yaml,yml}'
