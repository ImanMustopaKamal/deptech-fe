"use client";

import { useState } from "react";
import { TbAlertTriangle } from "react-icons/tb";
// import { showSubmittedData } from '@/utils/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Admin } from "./schema";
import { useAdmin } from "./context";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Admin;
}

export function DeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");

  const { reload } = useAdmin();
  const { request } = useApi();

  const handleToast = (message: string) => {
    toast(message, {
      action: {
        label: "Tutup",
        onClick: () => {
          console.log("tutup");
        },
      },
    });
  };

  const handleDelete = async () => {
    try {
      if (value.trim() !== currentRow.email.toString()) return;

      const res = await request(`/admin/${currentRow.id}`, {
        method: "DELETE",
      });

      if (res.data !== undefined) {
        reload();
        onOpenChange(false);
        handleToast(res?.metaData?.message || "Success");
      }
    } catch (error: any) {
      console.log("🚀 ~ handleDelete ~ error:", error);
      handleToast(error?.metaData?.message || "Internal Server Error");
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
