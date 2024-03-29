import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";

import { MoadlProvider } from "@/components/providers/ModalProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import AuthProvider from "@/components/providers/auth-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Analytics } from "@vercel/analytics/react";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s - ECarry Photography",
    default: "ECarry Photography",
  },
  description: "ECarry Photography",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ibmPlexMono.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            {children}
            <Analytics />
            <TailwindIndicator />
            <MoadlProvider />
            <Toaster />
            <SpeedInsights />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
