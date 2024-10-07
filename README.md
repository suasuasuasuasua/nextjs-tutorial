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

## Chapter 3 - Optimizing Fonts and Images

Fonts on a website can significantly impact performance especially if you are
using custom fonts which need to be fetched and loaded.

Google's search engine optimization (SEO) evaluates and ranks the performance of
your site base don Google's [Core Web
Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).
Google observes how real uesrs interact with the website, also known as *field
data* as opposed to *lab data* (don't need to know the nitty-gritty). This is
important because page and user experience is a strong ranking factor.

*Cumulative Layout Shift* is a metric that Google also uses when evaluating such
web vitals to rank performance and user experience. With fonts, layout shifts
happen when the browser initially loads and renders some fallback system font,
then switches over to the custom font. The swap between the fallback and custom
font can cause tons of shifting to text size, spcaing, elements, etc.

Next.js is nice in this regard because it downloads all font files and builds
and hosts them as static assets. That means that when users visit the
application, they don't have to wait for any additional network requests.

Adding a font is as simple as:

```typescript
// ./app/ui/fonts.ts

import { Inter } from 'next/font/google';

// We can import some font using the next/font API from google
// for example, we can grab a subset of the font we'd like to load
export const inter = Inter({
  subsets: ["latin"]
});
```

Image optimization is another rabbithole, but the idea is the same. We store to
and serve images from the `/public` folder. `next/image` is a component that
Next.js provides to automatically optimize our images, so we don't spend time
worrying about ensuring compatibility between devices, preventing layout shift,
etc.

The `<Image>` component is an extension of the generic `<img>` tag that includes
such optimization.

With TailwindCSS, we can create "breakpoints" like `sm` and `md` to create
responsive design. For example, we can use blocks and hiddens to show certain
images at certain browser sizes.
