import LeaveProvider from "@/components/features/leave/context"

export default function LeaveLayout({ children }: { children: React.ReactNode }) {
  return <LeaveProvider>{children}</LeaveProvider>
}