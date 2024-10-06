# [Next.js tutorial](https://nextjs.org/learn/dashboard-app/)
a

## Chapter 1 - Getting Started

We are going to be using `pnpm`, an alternative package manager to
`npm`, `yarn`, and whatnot, because of its speed.

```bash
# Install pnpm if you don't have it (or use the devenv shell :)))
npm install -g pnpm

# Initialize the Next.js app from a template
npx create-next-app@latest nextjs-dashboard \
    --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" \
    --use-pnpm
```

### Project Structure

- `app/` is where we will be spending most of our time
  - `app/lib/` is where we will define helper functions for utility, data
  fetching, etc.
  - `app/ui` is where we will be defining UI components for the application. In
  general, we need to *stylize* the components but the template has done that
  for us already
- `public/` is where we will add static assets like images and whatnot
- `*.config.*` are configuration files for the framework tooling. In general,
  this is a set and forget and is done already for us in the project
