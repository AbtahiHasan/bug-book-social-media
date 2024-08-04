"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { PasswordInput } from "@/components/ui/password-input";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState, useTransition } from "react";
import { signUp } from "./actions";

const SignUpFrom = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpValues) => {
    startTransition(async () => {
      const { error } = await signUp({
        username: values.email,
        email: values.email,
        password: values.password,
      });

      if (error) setError(error);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  type="password"
                  placeholder="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-destructive">{error}</p>}
        <LoadingButton loading={isPending} type="submit" className="w-full">
          Create Account
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignUpFrom;
