import { LoginForm } from "@/components/login-form";

type PageProps = {
  searchParams: { error?: string };
};

export default async function Page({ searchParams }: PageProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm searchParams={searchParams} />
    </div>
  );
}
