"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectDropdown } from "@/components/select-dropdown";
import { Leave } from "./schema";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { useApi } from "@/hooks/use-api";
import { useSession } from "next-auth/react";
import { useContext } from "./context";

const formSchema = z.object({
  id: z.number().optional(),
  reason: z.string().min(1, "Reason is required."),
  startDate: z
    .date({
      required_error: "Please select your start date.",
      invalid_type_error: "Invalid date format.",
    })
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select your start date.",
    }),
  endDate: z
    .date({
      required_error: "Please select your end date.",
      invalid_type_error: "Invalid date format.",
    })
    .optional()
    .refine((val) => val !== undefined, {
      message: "Please select your end date.",
    }),
  employeeId: z.number(),
  isEdit: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  currentRow?: Leave;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActionDialog({ currentRow, open, onOpenChange }: Props) {
  const [employees, setEmployees] = useState<{ id: number; name: string }[]>(
    []
  );

  const { request } = useApi();
  const { data: session } = useSession();
  const { reload } = useContext();

  const isEdit = !!currentRow;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: currentRow?.id || undefined,
      reason: currentRow?.reason || "",
      startDate: currentRow?.startDate
        ? new Date(currentRow.startDate)
        : undefined,
      endDate: currentRow?.endDate ? new Date(currentRow.endDate) : undefined,
      employeeId: currentRow?.employeeId || undefined,
      isEdit: isEdit,
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Form values:", values);

    try {
      const { id, isEdit, ...rest } = values;

      const url = isEdit ? `/leaves/${id}` : "/leaves";
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        ...rest,
        startDate: values.startDate?.toISOString() ?? null,
        endDate: values.endDate?.toISOString() ?? null,
      };

      const res = await request(url, {
        method: method,
        body: JSON.stringify(payload),
      });

      if (res.data !== undefined) {
        reload();
        form.reset();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await request("/employee");
        if (res.data) {
          const mapped = res.data.map((emp: any) => ({
            id: emp.id,
            name: `${emp.firstName} ${emp.lastName}`,
          }));
          setEmployees(mapped);
        }
        // const data = await res.json();
      } catch (err) {
        console.error(err);
      }
    }
    if (session) {
      fetchEmployees();
    }
  }, [session]);

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{isEdit ? "Edit Leave" : "Add New Leave"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the leave here. " : "Create new leave here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4">
          <Form {...form}>
            <form
              id="leave-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Employee Name
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value?.toString() || ""}
                      onValueChange={(val) => field.onChange(Number(val))}
                      placeholder="Select a employe"
                      className="col-span-4"
                      items={employees.map((emp) => ({
                        label: emp.name,
                        value: emp.id.toString(),
                      }))}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="col-span-4"
                        placeholder="Enter reason"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Start Date
                    </FormLabel>
                    <DatePicker
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      End Date
                    </FormLabel>
                    <DatePicker
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit" form="leave-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
