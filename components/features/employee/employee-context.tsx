"use client";

import React, { useEffect, useState } from "react";
import useDialogState from "@/hooks/use-dialog-state";
import { Employee } from "./schema";
import { useApi } from "@/hooks/use-api";
import { useSession } from "next-auth/react";

type EmployeeDialogType = "invite" | "create" | "update" | "delete";

interface EmployeeContextType {
  open: EmployeeDialogType | null;
  setOpen: (str: EmployeeDialogType | null) => void;
  currentRow: Employee | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Employee | null>>;
  reload: () => void;
  data: Employee[];
}

const EmployeeContext = React.createContext<EmployeeContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function EmployeeProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<EmployeeDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Employee | null>(null);
  const [data, setData] = useState<Employee[]>([]);

  const { request } = useApi();
  const { data: session } = useSession();

  const reload = async () => {
    if (!session) return;

    try {
      const response = await request("/leaves/employees-with-leaves");
      if (response.data) setData(response.data);
    } catch (err) {
      console.log("🚀 ~ reload ~ err:", err);
    } finally {
    }
  };

  useEffect(() => {
    reload();
  }, [session]);

  return (
    <EmployeeContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow, data, reload }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export const useEmployee = () => {
  const employeeContext = React.useContext(EmployeeContext);

  if (!employeeContext) {
    throw new Error("useEmployee has to be used within <EmployeeContext>");
  }

  return employeeContext;
};
