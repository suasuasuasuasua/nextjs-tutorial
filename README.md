# [Next.js tutorial](https://nextjs.org/learn/dashboard-app/)

## Chapter 1 - Getting Started

We are going to be using `pnpm`, an alternative package manager to
`npm`, `yarn`, and whatnot, because of its speed.

```bash
# Install pnpm if you don't have it (or use the devenv shell :)))
npm install -g pnpm

# Initialize the Next.js app from a template npx create-next-app@latest
nextjs-dashboard \
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

## Chapter 2 - CSS Styling

`app/ui/global.css` is where we can define CSS rules for all the routes in the
application. We can import the `global.css` file in any file, but it is best
practice to import in the top-level component. In Next.js, this is called the
root layout.

`Tailwind` is a CSS framework that helps us write utility classes directly in
our `tsx` markup. Basically, it's a way to speed up development when writing CSS
styling.

With Tailwind, we style elements by giving them class names like
`text-blue-500.` Note that even though CSS styles are shared globally, we are
only applying the class singularly to each element. We don't have to worry about
maintaining separate stylesheets like having a `button-blue` vs a
`paragraph-blue`, style collisions, etc.

### Styling Alternatives

CSS modules are a *traditional* CSS approach that allows us to scope CSS rules
to a specific component. The main benefit to CSS modules is that they are
locally scoped to components by default, which reduces the risk of styling
conflicts.
