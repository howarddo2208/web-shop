import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { MainNav } from '@/components/main-nav'
import { homeConfig } from '@/config/home'
import { cn } from '@/lib/utils'
import { SiteFooter } from '@/components/site-footer'
import { CartLink } from '@/components/cart-link'
import { Toaster } from '@/components/ui/toaster'
import { CartProvider } from '@/client/cart/cart-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Welcome to web shop',
  description: 'My project with new nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <CartProvider>
        <body className={inter.className}>
          <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
              <div className="flex h-20 items-center justify-between py-6">
                <MainNav items={homeConfig.mainNav} />
                <nav className="flex gap-3 items-center">
                  <CartLink />
                  <Link
                    href="/login"
                    className={cn(
                      buttonVariants({ variant: 'secondary', size: 'sm' }),
                      'px-4'
                    )}
                  >
                    Login
                  </Link>
                </nav>
              </div>
            </header>
            <main className="flex-1 container">{children}</main>
            <SiteFooter />
            <Toaster />
          </div>
        </body>
      </CartProvider>
    </html>
  )
}
