import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RepuList — Company Reputation Rankings",
  description:
    "Comprehensive company reputation rankings based on reviews and online data. Discover the best and worst companies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
