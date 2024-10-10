# Next.js tutorial

> [Tutorial](https://nextjs.org/learn/dashboard-app)

## Chapter 1 - Getting Started

We are going to be using `pnpm`, an alternative package manager to
`npm`, `yarn`, and whatnot, because of its speed.

```bash
# Install pnpm if you don't have it (or use the devenv shell :)))
npm install -g pnpm
# Initialize the Next.js app from a template npx create-next-app@latest
nextjs-dashboard --use-pnpm \
    --example \
    "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"
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
    general, we need to _stylize_ the components but the template has done that
    for us already
- `public/` is where we will add static assets like images and whatnot
- `*.config.*` are configuration files for the framework tooling. In general,
  this is a set and forget and is done already for us in the project

### Typescript??

Modern web development generally uses `typescript`, a _more_ type-safe version
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

CSS modules are a _traditional_ CSS approach that allows us to scope CSS rules
to a specific component. The main benefit to CSS modules is that they are
locally scoped to components by default, which reduces the risk of styling
conflicts.

## Chapter 3 - Optimizing Fonts and Images

Fonts on a website can significantly impact performance especially if you are
using custom fonts which need to be fetched and loaded.

Google's search engine optimization (SEO) evaluates and ranks the performance of
your site based on Google's [Core Web
Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).
Google observes how real uesrs interact with the website, also known as _field
data_ as opposed to _lab data_ (don't need to know the nitty-gritty). This is
important because page and user experience is a strong ranking factor.

_Cumulative Layout Shift_ is a metric that Google also uses when evaluating such
web vitals to rank performance and user experience. With fonts, layout shifts
happen when the browser initially loads and renders some fallback system font,
then switches over to the custom font. The swap between the fallback and custom
font can cause tons of shifting to text size, spacing, elements, etc.

Next.js is nice in this regard because it downloads all font files and builds
and hosts them as static assets. That means that when users visit the
application, they don't have to wait for any additional network requests.

Adding a font is as simple as:

```typescript
// ./app/ui/fonts.ts

import { Inter } from "next/font/google";

// We can import some font using the next/font API from google
// for example, we can grab a subset of the font we'd like to load
export const inter = Inter({
  subsets: ["latin"],
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

## Chapter 4 - Creating Layouts and Pages

Next.js uses a file-system routing where folders are used to create nested
routes. Each folder represents a route segment in the URL segment. We can create
separate user interfaces for each route using the `layout.tsx` and `page.tsx`
files.

For example, `acme.com/dashboard/invoices` maps to `app/dashboard/invoices` in
the actual folder structure.

`page.tsx` is a special Next.js file that exports a React component, and it is
**required** for the route to be accessible.

- for example, `./app/page.tsx` routes to `/` while if we add
  `./app/ui/dashboard/page.tsx` this will route to `/dashboard`

`layout.tsx` is another special file that defines some sort of shared structure
for pages. For example, we might want to share the same navigation UI.

One benefit of using routes in Next.js is that on navigation, page components
are lazily loaded. The page layout is figured out, while the page components
update. Thus, we don' thave to re-render the layout each time we revisit a page.
This is known as partial rendering.

Root layouts like `app/layout.tsx` are required. Any UI that we add to the root
layout will be shared across all pages in the application. The layout that we
defined for the dashboard is unique to the dashboard pages, so we don't need to
add any additional UI here.

## Chapter 5 - Navigating Between Pages

Traditionally, if we wanted to link between pages, we would use the anchor tag
`<a>`. The problem with this approach is that when we navigate between pages,
there is a full page refresh on the browser.

Instead, we should use the `<Link>` component from `next/link`. This link allows
us to write client side javascript. We can go ahead and fix the anchors in
`./app/ui/dashboard/nav-links.tsx` to use the `<Link>` instead.

### Why is There No Refresh?

Next.js automatically code splits your application by route segments. What this
means is that pages are effectively isolated from one another. If one page has
an error, the rest of them should be fine still. This is different than
traditional React SPA which makes the browser load the entire application on
initial load.

Moreover, whenever `<Link>` appears in the viewport, Next.js will prefetch the
code for the linked route in the background, so by the time that the user does
click the link the destination page is already loaded in the background. This is
why the page transition is near-instant.

### Interactive Page Design

A common UI pattern is to show the user which page they are currently on.
Next.js provides a hook called `usePathname()` that returns the user's current
path from the URL.

Since `usePathname()` is a hook, we have to transform our typescript file into a
client component by explicitly stating the `use client` directive.

## Chapter 6 - Setting Up the Database

We can create a `postgres` database through Vercel as the provider.

- Navigate to the project storage, then select postgres
- Click on `.env.local` to find the secret keys
  - Ignore these with the `.gitignore`
- `pnpm i @vercel/postgres` to download the `postgres` sdk

`./app/seed/route.ts` defines a Next.js route handler which is used to seed the
database. The idea is that this file creates a server side endpoint which we can
access to start filling in the database. Initially, it will take placeholder
data from a file and populate the table with sql commands.

In Vercel, we can view the tables and even run commands to interact with the
database.
