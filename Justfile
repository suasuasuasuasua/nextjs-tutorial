host := `uname -a`

run:
  pnpm run dev

update:
  pnpm update

install:
  pnpm install

fmt:
  prettier --write '**/*.{css,json,ts,tsx,html,yaml}'
