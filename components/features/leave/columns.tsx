import { ColumnDef } from "@tanstack/react-table";
import { Leave } from "./schema";
import { DataTableColumnHeader } from "../../data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export const columns: ColumnDef<Leave>[] = [
  {
    accessorKey: "employee.firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[100%]">
          {row.original.employee.firstName} {row.original.employee.lastName}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "reason",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reason" />
    ),
    cell: ({ row }) => {
      return <div className="w-[100%]">{row.original.reason}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[100%]">{formatDate(row.original.startDate)}</div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => {
      return <div className="w-[100%]">{formatDate(row.original.endDate)}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
