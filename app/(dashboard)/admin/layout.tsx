import Provider from "@/components/features/admin/context"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>
}