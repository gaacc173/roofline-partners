/**
 * Utility functions for computing the requested contact date/time.
 *
 * The date picker does not expose a year input. The year is derived
 * automatically: if the selected month/day has already passed in the
 * current year, the next year is used.
 */

/**
 * A partial date/time as selected by the user (without year).
 */
export interface DateTimeSelection {
  month: number; // 1-12
  day: number; // 1-31 (validated at the component level)
  hour: number; // 1-12
  minute: number; // 0-59
  ampm: "AM" | "PM";
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/**
 * Compute the requested contact datetime string in `YYYY-MM-DDTHH:mm`
 * format.
 *
 * - If the selected month/day has already passed in the current year,
 *   the year rolls over to next year.
 * - December → January rollover is handled correctly: selecting month 1
 *   (January) when the current month is December will use next year.
 * - Hour/minute are not used for rollover decisions (only month/day).
 */
export function computeRequestedContactAt(
  selection: DateTimeSelection,
  now: Date = new Date(),
): string {
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

  let year = currentYear;

  // If the selected month/day is in the past relative to today, roll over.
  if (selection.month < currentMonth) {
    year = currentYear + 1;
  } else if (selection.month === currentMonth && selection.day < currentDay) {
    year = currentYear + 1;
  }

  // Convert 12-hour hour to 24-hour for Date construction.
  let hour24 = selection.hour % 12;
  if (selection.ampm === "PM") {
    hour24 += 12;
  }

  if (
    selection.month < 1 ||
    selection.month > 12 ||
    selection.day < 1 ||
    selection.day > daysInMonth(year, selection.month) ||
    selection.hour < 1 ||
    selection.hour > 12 ||
    selection.minute < 0 ||
    selection.minute > 59
  ) {
    throw new RangeError("The selected date or time is invalid.");
  }

  // Build the date using UTC to avoid local DST shifts.
  const date = new Date(
    Date.UTC(year, selection.month - 1, selection.day, hour24, selection.minute),
  );

  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mi = String(date.getUTCMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}
