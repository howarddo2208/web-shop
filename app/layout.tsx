import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { homeConfig } from "@/config/home";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Icons } from "@/components/icons";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welcome to web shop",
  description: "My project with new nextjs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6">
              <MainNav items={homeConfig.mainNav} />
              <nav className="flex gap-3 items-center">
                <HoverCard>
                  <HoverCardTrigger>
                    <Link
                      href="/cart"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "px-4 cursor-pointer"
                      )}
                    >
                      <Icons.cart />
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    The React Framework – created and maintained by @vercel.
                  </HoverCardContent>
                </HoverCard>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "px-4"
                  )}
                >
                  Login
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1 container">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
