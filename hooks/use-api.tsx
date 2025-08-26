"use client";

import { useSession } from "next-auth/react";

export function useApi() {
  const { data: session } = useSession();
  const token = (session?.user as any)?.access_token ?? "";

  async function request<T = any>(url: string, options: RequestInit = {}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!res.ok) {
      // throw new Error(await res.text());
      const errorBody = await res.json().catch(() => null);
      throw errorBody || { message: "Internal Server Error", status: res.status };
    }
    return res.json() as Promise<T>;
  }

  return { request };
}
