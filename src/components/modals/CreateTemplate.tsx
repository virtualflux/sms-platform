"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const templateSchema = z.object({
  name: z.string().min(3, "Template name is required"),
  content: z.string().min(10, "Message content must be at least 10 characters"),
});

export type TemplateFormValues = z.infer<typeof templateSchema>;

interface CreateTemplateModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TemplateFormValues) => Promise<void> | void;
  pending: boolean
}

export default function CreateTemplateModal({ open, onClose, onSubmit, pending }: CreateTemplateModalProps) {
  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: { name: "", content: "" },
  });

  const handleSubmit: SubmitHandler<TemplateFormValues> = async (values) => {
    await onSubmit(values);
    // form.reset();
    // onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="dark:bg-neutral-900">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create SMS Template</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g Welcome Message" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} placeholder="Write your SMS content here..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={pending}>{pending ? "Loading..." : "Save Template"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
