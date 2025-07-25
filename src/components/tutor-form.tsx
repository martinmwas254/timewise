"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import type { Tutor } from "@/lib/types";

const tutorFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  specialities: z.string().min(1, {
    message: "Please enter at least one speciality.",
  }),
  availability: z.string().min(1, {
    message: "Please describe availability.",
  }),
});

type TutorFormProps = {
  onAddTutor: (tutor: Omit<Tutor, "id">) => void;
};

export function TutorForm({ onAddTutor }: TutorFormProps) {
  const form = useForm<z.infer<typeof tutorFormSchema>>({
    resolver: zodResolver(tutorFormSchema),
    defaultValues: {
      name: "",
      specialities: "",
      availability: "",
    },
  });

  function onSubmit(values: z.infer<typeof tutorFormSchema>) {
    const specialitiesArray = values.specialities
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onAddTutor({
      ...values,
      specialities: specialitiesArray,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tutor Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Dr. Eleanor Vance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialities</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Mathematics, Physics" {...field} />
              </FormControl>
              <FormDescription>
                Enter subjects separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Availability</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Mon-Fri 9am-3pm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Tutor
        </Button>
      </form>
    </Form>
  );
}
