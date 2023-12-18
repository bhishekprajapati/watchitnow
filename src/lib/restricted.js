import nextAuthConfig from "@/lib/nextAuthConfig";
import { isServer } from "@/utils";

import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export async function serverRestricted() {
  const session = await getServerSession();

  if (!session) {
    return redirect(nextAuthConfig.pages.signIn);
  }
}

export async function clientRestricted() {
  if (!isServer()) {
    const session = useSession();
    const router = useRouter();

    if (!session) {
      return router.push(nextAuthConfig.pages.signIn);
    }
  }
}
