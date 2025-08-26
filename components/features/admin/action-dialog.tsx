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
import { PasswordInput } from "@/components/password-input";
import { Admin } from "./schema";
import { SelectDropdown } from "@/components/select-dropdown";
import { DatePicker } from "@/components/date-picker";
import { useApi } from "@/hooks/use-api";
import { useAdmin } from "./context";
import { toast } from "sonner";

type DataForm = {
  id?: number | undefined;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date | undefined;
  gender: string;
  isEdit: boolean;
};

const formSchema = z
  .object({
    id: z.number().optional(),
    firstName: z.string().min(1, "First Name is required."),
    lastName: z.string().min(1, "Last Name is required."),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Invalid email address." }),
    password: z.string().transform((pwd) => pwd.trim()),
    dateOfBirth: z
      .date({
        required_error: "Please select your date of birth.",
        invalid_type_error: "Invalid date format.",
      })
      .optional()
      .refine((val) => val !== undefined, {
        message: "Please select your date of birth.",
      }),
    gender: z.string().min(1, "Gender is required."),
    isEdit: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.isEdit && !data.password) return true;
      return data.password.length > 0;
    },
    {
      message: "Password is required.",
      path: ["password"],
    }
  )
  .refine(
    ({ isEdit, password }) => {
      if (isEdit && !password) return true;
      return password.length >= 6;
    },
    {
      message: "Password must be at least 6 characters long.",
      path: ["password"],
    }
  )
  .refine(
    ({ isEdit, password }) => {
      if (isEdit && !password) return true;
      return /[a-z]/.test(password);
    },
    {
      message: "Password must contain at least one lowercase letter.",
      path: ["password"],
    }
  )
  .refine(
    ({ isEdit, password }) => {
      if (isEdit && !password) return true;
      return /\d/.test(password);
    },
    {
      message: "Password must contain at least one number.",
      path: ["password"],
    }
  );
type FormValues = z.infer<typeof formSchema>;

interface Props {
  currentRow?: Admin;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActionDialog({ currentRow, open, onOpenChange }: Props) {
  const { request } = useApi();
  const { reload } = useAdmin();
  const isEdit = !!currentRow;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: currentRow?.id || undefined,
      firstName: currentRow?.firstName || "",
      lastName: currentRow?.lastName || "",
      email: currentRow?.email || "",
      password: "",
      dateOfBirth: currentRow?.dateOfBirth
        ? new Date(currentRow.dateOfBirth)
        : undefined,
      gender: currentRow?.gender || "",
      isEdit: isEdit,
    },
  });

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

  const onSubmit = async (values: DataForm) => {
    try {
      const { isEdit, id, ...rest } = values;

      const payload = {
        ...rest,
        dateOfBirth: values.dateOfBirth?.toISOString() ?? null,
      };
      const url = isEdit ? `/admin/${id}` : "/admin";
      const method = isEdit ? "PUT" : "POST";

      const res = await request(url, {
        method: method,
        body: JSON.stringify(payload),
      });

      if (res.data !== undefined) {
        reload();
        form.reset();
        onOpenChange(false);
        handleToast(res?.metaData?.message || "Success");
      }
    } catch (error: any) {
      handleToast(error?.metaData?.message || "Internal Server Error");
      console.log("🚀 ~ onSubmit ~ error:", error);
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
          <DialogTitle>{isEdit ? "Edit Admin" : "Add New Admin"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the admin here. " : "Create new admin here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4">
          <Form {...form}>
            <form
              id="admin-form"
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Date of birth
                    </FormLabel>
                    <DatePicker
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={true}
                    />
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
                name="password"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">
                      Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="e.g., S3cur3P@ssw0rd"
                        className="col-span-4"
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
          <Button type="submit" form="admin-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
