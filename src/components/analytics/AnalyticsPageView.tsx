/**
 * Analytics page-view tracker.
 *
 * Client-side shim that fires a typed analytics event when a page
 * loads. Uses Next.js `usePathname` to resolve the current route and
 * maps known routes to the appropriate analytics event.
 *
 * This component is safe to render when analytics are disabled —
 * it performs no network calls and incurs zero overhead.
 */
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics, AnalyticsEvent, type AnalyticsEventName } from "@/lib/analytics";

const routeToEvent: Record<string, AnalyticsEventName> = {
  "/": AnalyticsEvent.HOMEPAGE_VIEW,
  "/packages": AnalyticsEvent.PACKAGE_VIEW,
  "/get-started": AnalyticsEvent.PACKAGE_SELECTED,
};

export function AnalyticsPageView() {
  const pathname = usePathname();

  useEffect(() => {
    const event = routeToEvent[pathname];
    if (event) {
      analytics.track(event, { path: pathname });
    }
  }, [pathname]);

  // This component does not render anything.
  return null;
}
