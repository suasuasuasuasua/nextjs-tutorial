import { fetchInvoicesPages } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import Pagination from "@/app/ui/invoices/pagination";
import Table from "@/app/ui/invoices/table";
import Search from "@/app/ui/search";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import React, { Suspense } from "react";

// page.tsx has two special properties: params and searchParams
//
// Since Page is a Server Component which fetches its own data, we can simply
// pass searchParams to the component
export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* lets the user search for specific invoices */}
        <Search placeholder="Search invoices..."></Search>
        {/* lets the user create invoices */}
        <CreateInvoice></CreateInvoice>
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<InvoicesTableSkeleton></InvoicesTableSkeleton>}
      >
        <Table query={query} currentPage={currentPage}></Table>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages}></Pagination>
      </div>
    </div>
  );
}
