"use client";
import { useContext } from "@/components/features/admin/context";
import { Dialogs } from "@/components/features/admin/dialogs";
import { columns } from "@/components/features/admin/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

export default function AdminPage() {
  const { setOpen, data } = useContext();

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your Admin
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="space-x-1" onClick={() => setOpen("create")}>
            <span>Create</span> <FaPlus size={18} />
          </Button>
        </div>
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
        <DataTable data={data} columns={columns} />
      </div>
      <Dialogs />
    </>
  );
}
