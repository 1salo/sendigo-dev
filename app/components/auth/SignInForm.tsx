"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().min(1, "Mail krävs").email("Ogiltlig mail"),
  password: z
    .string()
    .min(1, "Lösenord krävs")
    .min(8, "Lösenordet måste bestå av mer än 8 tecken"),
});

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    setLoginError(null); // Reset login error before a new attempt
    const signInData = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (signInData?.error) {
      setIsLoading(false);
      if (signInData.error === "CredentialsSignin") {
        setLoginError("Felaktig mail eller lösenord");
      } else {
        setLoginError(signInData.error);
      }
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-2xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded-lg px-4 pt-6 pb-10 mb-4"
          >
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="mail@example.com"
                        autoComplete="username"
                        className="focus:bg-transparent"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lösenord</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Lösenord"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            {loginError && (
              <div className="text-red-500 text-center my-2 text-xs">{loginError}</div>
            )}{" "}
            {/* Display login error */}
            <div className="my-5">
              <Link
                href="/forgot-password"
                className="text-blue-800 hover:underline text-sm"
              >
                Glömt lösenord?
              </Link>
            </div>
            <Button
              type="submit"
              className={`w-72 mx-auto block px-10 py-2 text-sm btn btn-primary rounded-full transition-transform duration-300 mt-4 ${
                isLoading ? "relative" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                "Logga in"
              )}
            </Button>
          </form>
          <div className="my-4 flex w-full items-center justify-center before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            eller
          </div>
          <p className="text-center text-sm text-gray-600">
            Om du inte har ett konto; &nbsp;
            <Link className="text-blue-500 hover:underline" href="/sign-up">
              Skapa konto nu
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
