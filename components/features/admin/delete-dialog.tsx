"use client";

import { useState } from "react";
import { TbAlertTriangle } from "react-icons/tb";
// import { showSubmittedData } from '@/utils/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Admin } from "./schema";
import { useContext } from "./context";
import { useApi } from "@/hooks/use-api";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Admin;
}

export function DeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");

  const { reload } = useContext();
  const { request } = useApi();

  const handleDelete = async () => {
    if (value.trim() !== currentRow.email.toString()) return;

    const res = await request(`/admin/${currentRow.id}`, {
      method: "DELETE",
    });

    if (res.data !== undefined) {
      reload();
      onOpenChange(false);
    }
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.email}
      title={
        <span className="text-destructive">
          <TbAlertTriangle
            className="stroke-destructive mr-1 inline-block"
            size={18}
          />{" "}
          Delete Admin
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{currentRow.email}</span>?
            <br />
            This action will permanently remove the admin from the system. This
            cannot be undone.
          </p>

          <Label className="my-2">
            Email:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter email to confirm deletion."
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Delete"
      destructive
    />
  );
}
