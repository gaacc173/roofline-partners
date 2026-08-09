import { permanentRedirect } from "next/navigation";

export default function GetStartedRedirect() {
  permanentRedirect("/#schedule-a-call");
}
