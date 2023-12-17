import FormSignIn from "../components/FormSignIn";

export const metadata = {
  title: "Sign in | Watchitnow",
};

export default async function SignInPage() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <FormSignIn />
    </div>
  );
}
