import { Container, SectionHeading } from "@/components/ui";
import { contactContent } from "@/content/marketing";
import { site } from "@/content/site";

export const metadata = {
  title: contactContent.metadata.title,
  description: contactContent.metadata.description,
};

export default function ContactPage() {
  return (
    <Container size="md">
      <SectionHeading
        tag={contactContent.eyebrow}
        title={contactContent.title}
        subtitle={contactContent.description}
        align="center"
      />
      <div className="mx-auto max-w-md space-y-6 rounded-lg border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          {contactContent.interimMessage}{" "}
          <a href={`mailto:${site.email}`} className="text-zinc-900 underline dark:text-zinc-50">
            {site.email}
          </a>
        </p>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          {contactContent.phoneLabel}:{" "}
          <a
            href={`tel:${site.phone.replace(/\D/g, "")}`}
            className="text-zinc-900 dark:text-zinc-50"
          >
            {site.phone}
          </a>
        </p>
      </div>
    </Container>
  );
}
