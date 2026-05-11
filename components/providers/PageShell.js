"use client";
import { usePathname } from "next/navigation";

export default function PageShell({ children }) {
  const pathname = usePathname();
  return <main key={pathname}>{children}</main>;
}
