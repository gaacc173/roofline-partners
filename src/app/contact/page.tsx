import { permanentRedirect } from "next/navigation";

export default function ContactRedirect() {
  permanentRedirect("/#schedule-a-call");
}
