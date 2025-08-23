import EmployeeProvider from "@/components/features/employee/employee-context"

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return <EmployeeProvider>{children}</EmployeeProvider>
}