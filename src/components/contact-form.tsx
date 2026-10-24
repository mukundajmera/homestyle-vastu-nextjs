"use client";

import { useRef, useState } from "react";
import { BRAND_NAME } from "@/lib/site";
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
import Link from "next/link";
import { navigate } from "@/lib/navigate";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().regex(/^\+?[0-9\s\-\(\)]{10,20}$/, 'Invalid phone number format').transform(v => v.replace(/\D/g, '')).pipe(z.string().min(10, 'Phone number must have at least 10 digits').max(15, 'Phone number must not exceed 15 digits')),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  location: z.string().trim().min(2, "City/Location is required").max(100),
  type: z.enum(["", "home", "business", "plot", "industrial", "other"]).refine((value): boolean => value !== "", "Please select a property category"),
  serviceInterest: z.enum([
    "",
    "general_vastu",
    "feng_shui",
    "plot_selection",
    "construction_renovation",
    "industrial_vastu",
    "floor_plan_review",
    "other",
  ]).refine((value): boolean => value !== "", "Please select a service"),
  format: z.enum(["", "onsite", "online"]).refine((value): boolean => value !== "", "Please select a consultation format"),
  inquiry: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.boolean().refine((value) => value, "Please consent to being contacted about this inquiry"),
  honeypot: z.string().max(0).optional(),
});

type FormInput = z.input<typeof formSchema>;
type FormValues = z.output<typeof formSchema>;

const serviceLabels: Record<FormValues["serviceInterest"], string> = {
  "": "a consultation",
  general_vastu: "Vastu consultation",
  feng_shui: "Feng Shui consultation",
  plot_selection: "plot or land selection",
  construction_renovation: "new construction or renovation guidance",
  industrial_vastu: "industrial or factory Vastu",
  floor_plan_review: "online floor-plan review",
  other: "another Vastu or Feng Shui service",
};

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);
  const submissionId = useRef<string | null>(null);

  const form = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      type: "",
      serviceInterest: "",
      format: "",
      inquiry: "",
      honeypot: "",
      consent: false,
    },
  });

  const isProduction = process.env.NODE_ENV === "production";
  const isGateOpen = process.env.NEXT_PUBLIC_LEAD_INTAKE_ENABLED === "true";
  const isFormDisabled = isProduction && !isGateOpen;

  if (isFormDisabled) {
    return (
      <div className="bg-muted/50 p-6 rounded-lg border border-border text-center space-y-4">
        <h3 className="text-xl font-headline font-bold text-foreground">Inquiries Temporarily Paused</h3>
        <p className="text-foreground/80">
          We are currently updating our systems and are not accepting new inquiries through the website at this time.
          Please check back later or contact us directly on WhatsApp.
        </p>
      </div>
    );
  }

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (!data.type || !data.serviceInterest || !data.format) {
        throw new Error("Please complete the required consultation selections.");
      }

      submissionId.current ??= window.crypto.randomUUID();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: submissionId.current,
          name: data.name,
          phone: data.phone,
          email: data.email,
          location: data.location,
          type: data.type,
          serviceInterest: data.serviceInterest,
          format: data.format,
          inquiry: data.inquiry,
          honeypot: data.honeypot,
          consent: data.consent,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success !== true || result.dbSuccess !== true) {
        throw new Error(result.error || "Failed to submit");
      }

      const whatsappNumber = "919828088678";
      const whatsappMessage = encodeURIComponent(
        `Hello, I have submitted an inquiry about ${serviceLabels[data.serviceInterest]} and would like to continue the conversation.`
      );
      const nextWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      setWhatsAppUrl(nextWhatsAppUrl);
      setSuccess("Your inquiry has been saved. WhatsApp will open with a short message; review it and press Send to start the conversation.");
      submissionId.current = null;
      form.reset();
      window.setTimeout(() => navigate(nextWhatsAppUrl), 1200);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try calling us instead.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      {/* RHF reads its internal refs when this event handler runs after a user submit. */}
      {/* eslint-disable-next-line react-hooks/refs */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {error && (
          <div role="alert" aria-live="assertive" className="bg-destructive/10 text-destructive text-sm font-medium p-4 rounded-md border border-destructive/20">
            {error}
          </div>
        )}
        {success && (
          <div role="status" aria-live="polite" className="rounded-md border border-green-700/20 bg-green-700/10 p-4 text-sm text-foreground">
            <p>{success}</p>
            {whatsAppUrl && <a className="mt-2 inline-block font-semibold text-primary underline underline-offset-4" href={whatsAppUrl}>Continue to WhatsApp now</a>}
          </div>
        )}

        {/* Honeypot field - hidden from users */}
        <FormField
          control={form.control}
          name="honeypot"
          render={({ field }) => (
            <FormItem className="hidden" aria-hidden="true">
              <FormControl>
                <Input {...field} tabIndex={-1} autoComplete="off" disabled={isSubmitting || Boolean(success)} />
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
                  <Input placeholder="Your full name" {...field} disabled={isSubmitting || Boolean(success)} />
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
                  <Input type="tel" placeholder="e.g. +91 98765 43210" {...field} disabled={isSubmitting || Boolean(success)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="serviceInterest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Interest (What guidance are you looking for?) <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <select
                  {...field}
                  value={field.value ?? ""}
                  onChange={(event) => field.onChange(event.target.value || undefined)}
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-3 pr-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isSubmitting || Boolean(success)}
                >
                  <option value="" disabled>Select a service</option>
                  <option value="general_vastu">Residential or commercial Vastu</option>
                  <option value="feng_shui">Feng Shui consultation</option>
                  <option value="plot_selection">Plot or land selection</option>
                  <option value="construction_renovation">New construction or renovation guidance</option>
                  <option value="industrial_vastu">Industrial or factory Vastu</option>
                  <option value="floor_plan_review">Online floor-plan review</option>
                  <option value="other">Something else</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} disabled={isSubmitting || Boolean(success)} />
                </FormControl>
                <p className="text-sm text-muted-foreground">No automatic email is sent after you submit this form.</p>
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
                  <Input placeholder="e.g. Jaipur, Rajasthan" {...field} disabled={isSubmitting || Boolean(success)} />
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
              <FormItem>
                <FormLabel>Property Category (What type of space is this?) <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <select
                    {...field}
                    value={field.value ?? ""}
                    onChange={(event) => field.onChange(event.target.value || undefined)}
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-3 pr-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSubmitting || Boolean(success)}
                  >
                    <option value="" disabled>Select a property category</option>
                    <option value="home">Home</option>
                    <option value="business">Business, Hotel, Hospital, or Restaurant</option>
                    <option value="plot">Plot</option>
                    <option value="industrial">Industrial</option>
                    <option value="other">Other</option>
                  </select>
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
                    disabled={isSubmitting || Boolean(success)}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 bg-background p-3 rounded-md border flex-1 cursor-pointer hover:border-primary/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="onsite" disabled={isSubmitting || Boolean(success)} />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer">
                        On-site (In person)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 bg-background p-3 rounded-md border flex-1 cursor-pointer hover:border-primary/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="online" disabled={isSubmitting || Boolean(success)} />
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
              <FormLabel>What guidance are you looking for? (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., I would like to review the floor plan for a new office space before finalizing the layout."
                  className="resize-y min-h-[100px]"
                  {...field}
                  disabled={isSubmitting || Boolean(success)}
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
                  disabled={isSubmitting || Boolean(success)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal cursor-pointer">
                  I consent to {BRAND_NAME} storing my submitted details in the inquiry database and contacting me about this request.
                </FormLabel>
                <FormDescription className="text-xs">
                  Read the <Link href="/privacy" className="font-semibold text-primary underline underline-offset-2">Privacy Policy</Link>.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="bg-muted/30 p-4 rounded-md text-sm text-muted-foreground flex flex-col space-y-2">
            <p>
              <strong>Next step:</strong> After the form is saved, we will open WhatsApp with a short draft message. The draft includes only your selected service interest; your name, phone, email, location, property category, and inquiry details are not added to the WhatsApp link. You will need to press Send in WhatsApp to start the conversation.
          </p>
        </div>

        <Button
          type="submit"
          className="w-full min-h-[3rem] h-auto py-3 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground whitespace-normal text-center leading-snug"
          disabled={isSubmitting || Boolean(success)}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Preparing to discuss your property...
            </>
          ) : (
            success ? "Inquiry saved" : "Submit & Discuss Your Property / Floor Plan on WhatsApp"
          )}
        </Button>

      </form>
    </Form>
  );
}
