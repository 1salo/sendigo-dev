"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import * as z from "zod";

const FormSchema = z
  .object({
    email: z.string().min(1, "Mail krävs").email("Ogiltlig mail"),
    password: z
      .string()
      .min(1, "Lösenord krävs")
      .min(8, "Lösenordet måste bestå av mer än 8 tecken"),
    confirmPassword: z.string().min(1, "Lösenordsbekräftelse krävs"),
    companyName: z.string().min(1, "Företagsnamn krävs"),
    phonenumber: z.string().min(1, "Företagstelefon krävs"),
    termsAccepted: z
      .boolean()
      .refine(
        (val) => val,
        "Godkänn användaravtalet, integritetspolicy och biträdesavtal"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Lösenordet matchar inte",
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      phonenumber: "",
      termsAccepted: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      router.push("/sign-in");
    } else if (response.status === 409) {
      setIsLoading(false);
      const errorData = await response.json();
      form.setError("email", {
        type: "manual",
        message: errorData.message,
      });
    } else {
      setIsLoading(false);
      console.error("Registration failed");
      const errorData = await response.json();
      alert(errorData.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 mt-10">
      <div className="w-full max-w-2xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded-lg px-4 pt-6 pb-10 mb-4"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Företagsnamn</FormLabel>
                    <FormControl>
                      <Input placeholder="Företag AB" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1 text-xs">
                      {form.formState.errors.companyName?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Företagstelefon</FormLabel>
                    <FormControl>
                      <Input placeholder="+46123456789" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1 text-xs">
                      {form.formState.errors.phonenumber?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Företagsmail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="mail@example.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1 text-xs">
                      {form.formState.errors.email?.message}
                    </FormMessage>
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
                        type="password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lösenord igen</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  {...form.register("termsAccepted")}
                  type="checkbox"
                  className="checkbox"
                />
                <span className="label-text text-xs w-60 my-4">
                  Jag godkänner Sendigos{" "}
                  <Link
                    href="/anvandaravtal"
                    className="text-blue-500 hover:underline"
                  >
                    användaravtal,
                  </Link>
                  <br />
                  <Link
                    href="/integritetspolicy"
                    className="text-blue-500 hover:underline"
                  >
                    integritetspolicy
                  </Link>{" "}
                  och{" "}
                  <Link
                    href="/bitradesavtal"
                    className="text-blue-500 hover:underline"
                  >
                    biträdesavtal
                  </Link>
                  .
                </span>
              </label>
              {form.formState.errors.termsAccepted && (
                <p className="text-red-500 w-60 text-xs">
                  {form.formState.errors.termsAccepted.message}
                </p>
              )}
            </div>

            <Button
              className={`w-72 mx-auto block px-10 py-2 text-sm btn btn-primary rounded-full transition-transform duration-300 mt-4 ${
                isLoading ? "relative" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                "Skapa konto"
              )}
            </Button>
          </form>
          <div className="my-4 flex items-center justify-center">
            <div className="my-4 flex w-full items-center justify-center before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
              eller
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Om du redan har ett konto; &nbsp;
            <Link className="text-blue-500 hover:underline" href="/sign-in">
              Logga in
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
