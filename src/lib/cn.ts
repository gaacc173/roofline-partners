/**
 * Lightweight className merge utility.
 *
 * Accepts strings, arrays, objects (key = class, value = boolean),
 * and falsy values. Returns a single space-separated class string
 * with falsy entries removed.
 *
 * Inspired by clsx + tailwind-merge minimal subset.
 */
type ClassValue =
  string | false | null | undefined | 0 | "" | Record<string, boolean> | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (typeof input === "string") {
      classes.push(...input.split(/\s+/).filter(Boolean));
    } else if (Array.isArray(input)) {
      classes.push(
        ...cn(...input)
          .split(/\s+/)
          .filter(Boolean),
      );
    } else if (typeof input === "object" && input !== null) {
      // Object syntax: { "class-name": boolean }
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
    // false, null, undefined, 0, "" are ignored
  }

  return classes.join(" ");
}
