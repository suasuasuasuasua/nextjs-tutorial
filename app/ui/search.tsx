"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const delay = 5e2; // ms

  const handleSearch = useDebouncedCallback(
    (term: string) => {
      // URLSearchParams is a web API that provides utility methods for
      // manipulating the URL query parameters
      // It helps us more easily interact with and parse ?page=1&query=a
      const params = new URLSearchParams(searchParams);
      // Reset the table page count to 1 on a new search
      params.set("page", "1");

      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      // At this point, we've made the new query string, but we haven't updated
      // the URL yet. For that, we'll need functions like usePathname() and
      // replace from useRouter().
      //
      // usePathname grabs something like `/dashboard/invoices`
      // params.toString() returns something like ?query=lee if the user searches
      //  for lee (just a more URL-friendly format)
      // replace
      //
      // What is nice about Next.js is that the URL is updated without refreshing
      // the page, thanks to Next.js's client-side navigation
      replace(`${pathname}?${params.toString()}`);
    },
    // Only run the code after 300ms
    delay
  );

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        // Define an event handler for the input field
        onChange={e => {
          handleSearch(e.target.value);
        }}
        // If there is a query already there, then fill that into the input
        // field
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
