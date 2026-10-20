"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(10, "Phone number must be at least 10 characters").max(20),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  location: z.string().min(2, "City/Location is required").max(100),
  type: z.enum(["residential", "commercial"], {
    required_error: "Please select a service type",
  }),
  format: z.enum(["onsite", "online"], {
    required_error: "Please select a consultation format",
  }),
  inquiry: z.string().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted" }),
  }),
  honeypot: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      type: undefined,
      format: undefined,
      inquiry: "",
      honeypot: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          location: data.location,
          type: data.type,
          format: data.format,
          inquiry: data.inquiry,
          honeypot: data.honeypot,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to submit");
      }

      // On successful DB persistence, direct to WhatsApp
      const whatsappNumber = "919828088678";
      // Construct a concise message that does NOT include private details (PII)
      const whatsappMessage = encodeURIComponent(
        `Hello, I just submitted an inquiry for a ${data.type} ${data.format} consultation on the website.`
      );

      window.location.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try calling us instead.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm font-medium p-4 rounded-md border border-destructive/20">
            {error}
          </div>
        )}

        {/* Honeypot field - hidden from users */}
        <FormField
          control={form.control}
          name="honeypot"
          render={({ field }) => (
            <FormItem className="hidden" aria-hidden="true">
              <FormControl>
                <Input {...field} tabIndex={-1} autoComplete="off" />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="e.g. +91 98765 43210" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City/Location <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Jaipur, Rajasthan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6 bg-muted/50 p-6 rounded-lg border border-border">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Service Interest <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 bg-background p-3 rounded-md border flex-1 cursor-pointer hover:border-primary/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="residential" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer">
                        Residential
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 bg-background p-3 rounded-md border flex-1 cursor-pointer hover:border-primary/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="commercial" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer">
                        Commercial
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Preferred Format <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 bg-background p-3 rounded-md border flex-1 cursor-pointer hover:border-primary/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="onsite" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer">
                        On-site (In person)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 bg-background p-3 rounded-md border flex-1 cursor-pointer hover:border-primary/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="online" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer">
                        Online / Remote
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="inquiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Inquiry (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Briefly describe what you're looking for..."
                  className="resize-y min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 border p-4 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal cursor-pointer">
                  I consent to having Homestyle Vastu store my submitted information and contact me regarding this inquiry.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="bg-muted/30 p-4 rounded-md text-sm text-muted-foreground flex flex-col space-y-2">
          <p>
            <strong>Note:</strong> Upon successful submission, your details will be saved to our system, and you will be securely redirected to WhatsApp to continue the conversation with a brief, private message.
          </p>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-bold bg-[#087A3A] hover:bg-[#066632] text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit and Continue to WhatsApp"
          )}
        </Button>

      </form>
    </Form>
  );
}
