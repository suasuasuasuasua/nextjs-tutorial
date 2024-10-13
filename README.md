# Next.js tutorial

> [Tutorial](https://nextjs.org/learn/dashboard-app)

## Chapter 1 - Getting Started

We are going to be using `pnpm`, an alternative package manager to `npm`,
`yarn`, and whatnot, because of its speed.

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
your site based on Google's
[Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).
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
  - Ignore these with the `.gitignore` - `pnpm i @vercel/postgres` to download
    the `postgres` sdk

`./app/seed/route.ts` defines a Next.js route handler which is used to seed the
database. The idea is that this file creates a server side endpoint which we can
access to start filling in the database. Initially, it will take placeholder
data from a file and populate the table with sql commands.

In Vercel, we can view the tables and even run commands to interact with the
database.

## Chapter 7 - Fetching Data

By default, Next.js uses React server components which give a few _nicities_

- For one, since the components are _server side_, the server can do the heavy
  lifting then send the result to the client. Moreover, server side components
  support JS features like promises for asynchronous programming. This allows us
  to program without using react functions like `useEffect` and `useState`.
  Lastly, since the server components execute on the server, we can query the
  database directly without interacting with some middleman API layer.

For this tutorial, we will writing database queries in SQL -- the postgres
flavor. We'll be using the Vercel Postgres SDK (software development kit), which
is an efficient way to interact with our postgres database.

- The SDK provides a few nice features like protection against SQL injection too

### The Dashboard

First, we'll modify the dashboard at `./app/dashboard/page.tsx` by adding data
requesting features. In this file, we are exporting a page component which is
`async`,which means that we can use `await` to fetch data.

In the component body, we can declare `const` variables that contain the fetched
data. One thing to note is that the data requests are unintentionally blocking
each other right now, creating what's known as a request waterfall. Moreover, we
learned that Next.js prerenders the routes to improve user experience and client
performance. This is called static rendering, and when data is finally loaded
the elements in the dashboard won't be moving around.

### Request Waterfalls

A request waterfall is when a series of requests happen sequentially because
they depend on the order of completion. Most of the time, this isn't true and
data fetching can be improved by processing these requests in parallel.

One way to achieve parallel data fetching is by using Javascript's
`Promise.all()` or `Promise.allSettled()` functions to initiate all promises at
the same time. One problem with this approach is that one request which is
disproportionately slower than the rest will slow all other requests down.

## Chapter 8 - Static and Dynamic Rendering

Static rendering happens on the server at build time or when data is
revalidated. When users access the website, the cached result (which is built on
the server) is served, leading to 1) faster loading times, 2) reduced server
load, and 3) better SEO (search engine optimization) because web crawlers can
more easily index statically served content.

Dynamic rendering is where the content is rendered on the server on a per-user
basis. For example, the dashboard would be a good place for dynamic rendering
because we want users to see the latest changes, which isn't necessarily at the
compile/deploy time. Moreover, we can cater to specific users by showing their
own data, interact with cookies, etc.

With dynamic rendering, our application is as slow as our slowest data fetch.
We've added an artificial 3 second delay in `fetchRevenue()` under
`./app/lib/data.ts`. With this delay, our whole app freezes until that revenue
data is fetched.

## Chapter 9 - Streaming

Streaming is a data transfer technique where we break down a route into smaller
chunks and progressively stream the content as it becomes ready.

With streaming we can prevent slow data requests from completely freezing our
page. The user will still be able to interact with the UI while the rest of the
data is being loaded in. Note that there won't be any layout shift because
Next.js computes where everything _should_ be at compile time. Streaming works
well with React because each component can be considered a chunk, and thus
loaded in parallel independently from one another.

`loading.tsx` is a special Next.js file built on top of `Suspense`. It is a
fallback UI that is shown when the page content is still being loaded. Since the
`SideNav` is a static element, it is shown immediately.

The `DashboardSkeleton` is something that we can show in the meantime (defined
in `./app/ui/skeletons.tsx`). Moreover, since `load.tsx` is higher in the tree
structure than `./app/dashboard/invoices` and `./app/dashboard/customers`, these
changes will be applied downstream. We don't necessarily want them to have these
changes though, so we can define an `(overview)/` folder to create Route groups.

Route groups let us organize the files into logical groups without creating new
URLs or affecting the URL path structure. So `/dashboard/(overview)/page.tsx`
becomes `/dashboard`. We can do custom route groups like `(marketing)` or
`(shopping)` for larger applications too.

Up to this point, we've been streaming an entire page at a time. We can be more
granular by streaming by component using React's `Suspense`. `Suspense` allow us
to render parts of the application until some condition is met (like when data
is loaded). We can wrap those specific components in a `Suspense` and pass a
fallback component while the dynamic content is loading.

We can group components that we want to be loaded together in a wrapper. It is
really up to the designer what they are prioritizing when creating the suspense
boundaries. Ideally, we want to move suspenses to the components that actually
need and fetch data. We shouldn't be trying to load all the data in at once in a
parent component.

## Chapter 10 - Partial Prerendering

Partial prerendering (PPR) is a technique that combines static and dynamic
rendering and streaming. In Next.js, when we call dynamic functions in a route
(like querying the database for example), the entire route becomes dynamic.

For our app, we would consider the login page static, while most of the
components on the dashboard should be dynamic because it is presenting data
specifically for the user -- the only exception is the side navigation bar
because it does not have any data requests. In general, if the components relies
on database queries or API fetches, it is a dynamic component.

PPR is an experimental rendering model that combines both static and dynamic
rendering schemes in the same route. When a user visits a page, they are served
a static route that has all the constructed components in place. There are
shells left in places where dynamic content will be slotted in. These holes are
streamed in parallel to reduce the overall load of the page.

PPR uses React's `Suspense` to defer rendering parts of the application until
some condition is met. The suspense fallback is embedded into the static page as
a skeleton, so that at build time this is what is being shown instead of the
_actual_ data. The rendering of the data is actually postponed until the user
requests the route.

Go to `./next.config.mjs` and add the following.

```js
const nextConfig = {
  experimental: {
    // Enable partial prerendering
    ppr: "incremental",
  },
};
```

Then go to `./app/dashboard/layout.tsx` and add the following.

```js
// Explicitly add the experimental partial prerendering flag to the dashboard
// layout -- the great thing about PPR is that we don't need to change our code
// to use it
export const experimental_ppr = true;
```

Next.js believes that PPR has the potential to become the next default rendering
model for web applications!

## Chapter 11 - Adding Search and Pagination

We are going to be adding search features for the invoices on the dashboard. The
user will be presented with a page where they can search, create, and see
invoices based on some search parameter.

We will be using a URL search parameter to connect what the user's actions to
the server's data fetching and rendering on the client side. The reason why we
are using the URL itself to manage the search state is because 1) we have the
ability to bookmark and share the URL, 2) the server side processing is easier
since we can simply look at the URL parameters, and 3) we can track user
behaviour without implementing any additional client side logic -- i.e. which
_pages_ or _queries_ are the most popular?

To implement the search functionality, we can use Next.js API functions like

- `useSearchParams` to access the parameters in the current URL
- `usePathname` to let us read the current URL's pathname
- `useRouter` will enable navigation between routes within client components
  programmatically

The implementations steps are like this:

1. Capture the user's input in the search box
   - Inside `./app/ui/search.tsx`, we declare search as a client component so
     that we can manage state using event listeners and hooks
   - We can define assign `onChange` function for the text input field
2. Update the URL with the search parameters
   - The URL can be updated using a few Next.js APIs but namely the `replace()`
     from `useRouter`
3. Keep the URL in sync with the search field
   - We can fetch the current URL, extract the query, then fill that query into
     the search input
4. Update the table with the search parameters
   - On the `./app/dashboard/invoices/page.tsx`, we can use a special property
     available to `page.tsx` called `searchParams` to extract the query and
     handle the request in the `Suspense`.
   - First, we'll actually want to implement debouncing because each keystroke
     queries the database

We can also add pagination by considering which page we are currently on and
dividing the query into N pages depending on having M queries on each page. We
can use the page number as an offset into the database query.
