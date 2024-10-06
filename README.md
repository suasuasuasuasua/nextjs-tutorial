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
    - When we are building user interfaces, we don't necessarily have real data
    or databases or APIs set up yet
    - Currently, we have placeholder data located at
    `app/lib/placeholder-data.ts`
  - `app/ui` is where we will be defining UI components for the application. In
  general, we need to *stylize* the components but the template has done that
  for us already
- `public/` is where we will add static assets like images and whatnot
- `*.config.*` are configuration files for the framework tooling. In general,
  this is a set and forget and is done already for us in the project

### Typescript??

Modern web development generally uses `typescript`, a *more* type-safe version
of `javascript`. At the end of the day, we will have to transpile the `ts` or
`tsx` to `js` anyway. The rationale is to prevent mismanaged data and silly
mistakes.

We have some example types defined in `app/lib/definitions.ts`, but in general
we want to use a 3rd party tool like `Prisma` to generate types based on the
database schema.

### Running the project

`pnpm i` to install all the packages, then `pnpm dev` to start the local
development server.
