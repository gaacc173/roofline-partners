export interface TrustSignal {
  label: string;
  value: string;
  description: string;
}

export const trustSignals: TrustSignal[] = [
  {
    label: "Shared leads",
    value: "No",
    description: "Appointments are exclusive to your territory.",
  },
  {
    label: "Retainers",
    value: "No",
    description: "Pricing and terms are discussed on your call.",
  },
  {
    label: "Appointment types",
    value: "4",
    description: "Storm, replacement, hail, and insurance jobs.",
  },
] as const;

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [];
