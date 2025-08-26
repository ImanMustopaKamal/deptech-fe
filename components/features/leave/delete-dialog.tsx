"use client";

import { useState } from "react";
import { TbAlertTriangle } from "react-icons/tb";
// import { showSubmittedData } from '@/utils/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Leave } from "./schema";
import { useLeave } from "./context";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Leave;
}

export function DeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState("");

  const { reload } = useLeave();
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
      if (value.trim() !== currentRow.id.toString()) return;

      const res = await request(`/leaves/${currentRow.id}`, {
        method: "DELETE",
      });

      if (res.data !== undefined) {
        reload();
        onOpenChange(false);
        handleToast(res?.metaData?.message || "Success");
      }
    } catch (error: any) {
      handleToast(error?.metaData?.message || "Internal Server Error");
      console.log("🚀 ~ handleDelete ~ error:", error);
    }
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.reason}
      title={
        <span className="text-destructive">
          <TbAlertTriangle
            className="stroke-destructive mr-1 inline-block"
            size={18}
          />{" "}
          Delete User
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{currentRow.reason}</span>?
            <br />
            This action will permanently remove the user with the role of{" "}
            <span className="font-bold">
              {currentRow.reason.toUpperCase()}
            </span>{" "}
            from the system. This cannot be undone.
          </p>

          <Label className="my-2">
            Username:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter username to confirm deletion."
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
