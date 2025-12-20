"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const senderIdSchema = z.object({
  sender: z.string().min(3, "Sender ID is required").max(11, "Max 11 characters allowed"),
  organization: z.string().optional(),
  registrationNo: z.string().optional(),
  address: z.string().optional(),
  sampleMessage: z.string().min(20, "Sample message must be at least 20 characters"),
});

export type SenderIdFormValues = z.infer<typeof senderIdSchema>;

interface CreateSenderIdModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SenderIdFormValues) => Promise<void> | void;
  pending: boolean
}

export default function CreateSenderIdModal({ open, onClose, onSubmit,pending }: CreateSenderIdModalProps) {
  const form = useForm<SenderIdFormValues>({
    resolver: zodResolver(senderIdSchema),
    defaultValues: {
      sender: "",
      organization: "",
      registrationNo: "",
      address: "",
      sampleMessage: "",
    },
  });

  const handleSubmit: SubmitHandler<SenderIdFormValues> = async (values) => {
    await onSubmit(values);
    form.reset();
    // onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="dark:bg-neutral-900 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Register Sender ID</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            
            <FormField
              control={form.control}
              name="sender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sender ID (Max 11 chars)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="EXAMPLE" maxLength={11} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Business/Brand Name" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registrationNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="CAC / NIN Number" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Location / Business Address" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sampleMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sample SMS</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} placeholder="Message sample for approval request..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={pending}>{pending ? "Loading..." :"Submit Request"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
