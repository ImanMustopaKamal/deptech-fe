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
import { Input } from "@/components/ui/input";
import { SelectDropdown } from "@/components/select-dropdown";
import { Employee } from "./schema";
import { Textarea } from "@/components/ui/textarea";
import { useApi } from "@/hooks/use-api";
import { useEmployee } from "./employee-context";

type DataForm = {
  id?: number | undefined;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  isEdit?: boolean;
};

const formSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().min(1, "First Name is required."),
  lastName: z.string().min(1, "Last Name is required."),
  phone: z.string().min(1, "Phone is required."),
  address: z.string().min(1, "Address is required."),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  gender: z.string().min(1, "Gender is required."),
  isEdit: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  currentRow?: Employee;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmployeeActionDialog({
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const { request } = useApi();
  const { reload } = useEmployee();

  const isEdit = !!currentRow;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: currentRow?.id || undefined,
      firstName: currentRow?.firstName || "",
      lastName: currentRow?.lastName || "",
      email: currentRow?.email || "",
      phone: currentRow?.phone || "",
      address: currentRow?.address || "",
      gender: currentRow?.gender || "",
      isEdit: isEdit,
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Form values:", values);

    try {
      const { id, isEdit, ...rest } = values;

      console.log("Extracted values:", { isEdit, id, rest });

      const url = isEdit ? `/employee/${id}` : "/employee";
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        ...rest,
      };

      console.log("Payload:", payload);

      const res = await request(url, {
        method: method,
        body: JSON.stringify(payload),
      });

      console.log("Response:", res);

      if (res.data !== undefined) {
        reload();
        form.reset();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

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
          <DialogTitle>
            {isEdit ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the employee here. "
              : "Create new employee here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4">
          <Form {...form}>
            <form
              id="data-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@gmail.com"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+123456789"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Gender
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select a gender"
                      className="col-span-4"
                      items={[
                        { label: "male", value: "male" },
                        { label: "female", value: "female" },
                      ]}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="col-span-4"
                        placeholder="Enter address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit" form="data-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
