import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Form Guide V2",
  description: "Matt's handy new form guide, revisited",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-full`}>
        <div className="p-8">{children}</div>
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
