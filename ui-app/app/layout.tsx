import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Form Guide V2",
  description: "Matt's handy new form guide, revisited",
};

export default function RootLayout({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-full p-8 grid grid-flow-row gap-8`}
      >
        <div>
          <h1>The Form Guide</h1>
          <nav>
            <Link href="/form/mls/2023">Form</Link> •{" "}
            <Link href="/form-rolling/mls/2023">Rolling</Link>
          </nav>
        </div>
        <hr />
        <div>{children}</div>
        <hr />
        <div>
          <a
            href="https://github.com/mattmontgomery/formguide-v2"
            className="text-win"
          >
            Contribute on Github
          </a>
        </div>
      </body>
    </html>
  );
}
