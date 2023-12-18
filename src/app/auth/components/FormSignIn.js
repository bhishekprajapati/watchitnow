import IconLogo from "@/components/Icons/IconLogo";
import ButtonAuth from "./ButtonAuth";

import { getProviders } from "next-auth/react";
import IconGoogle from "@/components/Icons/IconGoogle";

export default async function FormSignIn({}) {
  const providers = await getProviders();

  return (
    <div>
      <div className="text-center mb-8 md:mb-12">
        <IconLogo className="mr-4" />
        <h1 className="align-middle inline-block text-heading-md font-medium text-red">
          WatchItNow!
        </h1>
      </div>
      <div className="rounded-lg shadow-2xl shadow-black/25 bg-semi-dark-blue p-6 md:p-8">
        <div>
          {Object.values(providers).map((provider) => (
            <ButtonAuth
              key={provider.id}
              provider={provider}
              callbackUrl="/app/home"
              preserveCallbackInitiator
            >
              {provider.id === "google" && <IconGoogle />}
              Sign in with {provider.name}
            </ButtonAuth>
          ))}
        </div>
      </div>
    </div>
  );
}
