import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "./schema";
import { DataTableColumnHeader } from "../../data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Employee>[] = [
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
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.original.phone}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.original.address}</div>;
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
    accessorKey: "totalLeaveDays",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => {
      return <div className="w-[100%]">{row.original.totalLeaveDays} days</div>;
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
