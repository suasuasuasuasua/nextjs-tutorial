import React from "react";
import SideNav from "../ui/dashboard/sidenav";

// Explicitly add the experimental partial prerendering flag to the dashboard
// layout -- the great thing about PPR is that we don't need to change our code
// to use it
export const experimental_ppr = true;

// The SideNav component is defined as a custom UI component

// By default, the layout will return this Layout component
// It will receive children prop as an argument. Here, we say that the
// children can be a page or another layout, hence the React.ReactNode
// Thus, pages inside the /dashboard will automatically be nested inside a
// Layout
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>

      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
