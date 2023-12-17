import FormSignIn from "../components/FormSignIn";

export const metadata = {
  title: "Sign in | Watchitnow",
};

export default async function SignInPage() {
  return (
    <div className="w-screen h-[100dvh] bg-[url(/signin-backdrop.jpg)] bg-no-repeat bg-cover bg-center">
      <div className="h-full bg-dark-blue/90">
        <div className="h-full flex items-center justify-center">
          <FormSignIn />
        </div>
      </div>
    </div>
  );
}
