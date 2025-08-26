"use client";

import React, { useEffect, useState } from "react";
import useDialogState from "@/hooks/use-dialog-state";
import { Leave } from "./schema";
import { useApi } from "@/hooks/use-api";
import { useSession } from "next-auth/react";

type DialogType = "invite" | "create" | "update" | "delete";

interface ContextType {
  open: DialogType | null;
  setOpen: (str: DialogType | null) => void;
  currentRow: Leave | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Leave | null>>;
  reload: () => void;
  data: Leave[];
}

const Context = React.createContext<ContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function Provider({ children }: Props) {
  const [open, setOpen] = useDialogState<DialogType>(null);
  const [currentRow, setCurrentRow] = useState<Leave | null>(null);
  const [data, setData] = useState<Leave[]>([]);

  const { request } = useApi();
  const { data: session } = useSession();

  const reload = async () => {
    if (!session) return;

    try {
      const response = await request("/leaves");
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
    <Context.Provider value={{ open, setOpen, currentRow, setCurrentRow, data, reload }}>
      {children}
    </Context.Provider>
  );
}

export const useLeave = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error("useContext has to be used within <Context>");
  }

  return context;
};
