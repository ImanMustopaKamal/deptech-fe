"use client";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/features/employee/columns";
import { useEmployee } from "@/components/features/employee/employee-context";
import { EmployeeDialogs } from "@/components/features/employee/employee-dialogs";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

export default function Employee() {
  const { setOpen, data } = useEmployee();

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Employee</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your Employee
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
      <EmployeeDialogs />
    </>
  );
}
