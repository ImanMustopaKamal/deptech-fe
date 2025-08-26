"use client";
import { DatePicker } from "@/components/date-picker";
import { Admin } from "@/components/features/admin/schema";
import { SelectDropdown } from "@/components/select-dropdown";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useApi } from "@/hooks/use-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type DataForm = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
};

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required."),
  lastName: z.string().min(1, "Last Name is required."),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
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
});
type FormValues = z.infer<typeof formSchema>;

export default function Profile() {
  const { data: session } = useSession();
  const { request } = useApi();

  const id = (session?.user as any)?.id || null;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: undefined,
      gender: "",
    },
  });

  const onSubmit = async (values: DataForm) => {
    const payload = {
      ...values,
      dateOfBirth: values.dateOfBirth?.toISOString() ?? null,
    };

    const res = await request(`/admin/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    if (res.data !== undefined) {
      toast(res?.metaData?.message || "", {
        action: {
          label: "Tutup",
          onClick: () => console.log("Undo"),
        },
        onAutoClose: () => console.log("ok")
      });
    }
  };

  const reload = async () => {
    if (!id) return;
    try {
      const response = await request(`/admin/${id}`);
      if (response.data) {
        const admin: Admin = response.data;
        form.reset({
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          dateOfBirth: admin.dateOfBirth
            ? new Date(admin.dateOfBirth)
            : undefined,
          gender: admin.gender,
        });
      }
    } catch (err) {
      console.log("🚀 ~ reload ~ err:", err);
    }
  };

  useEffect(() => {
    reload();
  }, [id]);

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your Leave
          </p>
        </div>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
        {/* <aside className="top-0 lg:sticky lg:w-1/5"></aside> */}
        <div className="flex w-full overflow-y-hidden align-middle justify-center p-1">
          <Form {...form}>
            <form
              id="profile-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 col-start-1 text-right">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        className="col-span-3 col-start-3"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 col-start-1 text-right">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        className="col-span-3 col-start-3"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 col-start-1 text-right">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@gmail.com"
                        className="col-span-3 col-start-3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 col-start-1 text-right">
                      Date of birth
                    </FormLabel>
                    <DatePicker
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={true}
                    />
                    <FormMessage className="col-span-3 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 col-start-1 text-right">
                      Gender
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select a gender"
                      className="col-span-3 col-start-3"
                      items={[
                        { label: "male", value: "male" },
                        { label: "female", value: "female" },
                      ]}
                    />
                    <FormMessage className="col-span-3 col-start-3" />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                <Button
                  type="submit"
                  form="profile-form"
                  className="col-span-2 col-start-4 lg:col-span-1 lg:col-start-5"
                >
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
