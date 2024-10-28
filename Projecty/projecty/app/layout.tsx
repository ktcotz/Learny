import { Logo } from "@/components/Logo";
import { Navigation } from "@/components/Navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Wild Oasis",
  description: "Learned by NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <header>
          <Logo />
          <Navigation />
        </header>
        {children}
      </body>
    </html>
  );
}
