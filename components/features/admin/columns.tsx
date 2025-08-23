import { ColumnDef } from "@tanstack/react-table";
import { Admin } from "./schema";
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

export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.original.firstName} {row.original.lastName}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.original.email}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Of Birth" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{formatDate(row.original.dateOfBirth)}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.original.gender}</div>;
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
