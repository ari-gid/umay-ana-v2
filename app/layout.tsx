import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'BloomCare - Your Pregnancy Journey, Beautifully Supported',
  description:
    'BloomCare is a pregnancy support platform offering forums, articles, doctor connections, and AI-powered guidance for expectant mothers.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          backgroundColor: '#fff',
          color: '#1f2937',
        }}
      >
        <nav
          style={{
            background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
            borderBottom: '1px solid #f9a8d4',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '64px',
            }}
          >
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🌸</span>
                <span
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#be185d',
                    letterSpacing: '-0.025em',
                  }}
                >
                  BloomCare
                </span>
              </div>
            </Link>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              {[
                { href: '/', label: 'Home' },
                { href: '/forum', label: 'Forum' },
                { href: '/articles', label: 'Articles' },
                { href: '/doctors', label: 'Doctors' },
                { href: '/chat', label: 'AI Chat' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: '0.5rem 0.875rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#9d174d',
                    textDecoration: 'none',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                      'rgba(249, 168, 212, 0.4)'
                  }}
                  onMouseOut={(e) => {
                    ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                      'transparent'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <main style={{ minHeight: 'calc(100vh - 64px - 200px)' }}>
          {children}
        </main>

        <footer
          style={{
            background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
            borderTop: '1px solid #f9a8d4',
            padding: '2.5rem 1.5rem',
            marginTop: '4rem',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🌸</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#be185d' }}>
                  BloomCare
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#9d174d', lineHeight: '1.6' }}>
                Supporting your pregnancy journey with care, community, and expert guidance.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#be185d', marginBottom: '0.75rem' }}>
                Resources
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { href: '/articles', label: 'Articles' },
                  { href: '/forum', label: 'Community Forum' },
                  { href: '/doctors', label: 'Find a Doctor' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ fontSize: '0.875rem', color: '#9d174d', textDecoration: 'none' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#be185d', marginBottom: '0.75rem' }}>
                Support
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Help Center', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <span key={item} style={{ fontSize: '0.875rem', color: '#9d174d', cursor: 'pointer' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#be185d', marginBottom: '0.75rem' }}>
                Disclaimer
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#9d174d', lineHeight: '1.6' }}>
                BloomCare provides general information only. Always consult your healthcare provider for medical advice.
              </p>
            </div>
          </div>
          <div
            style={{
              maxWidth: '1200px',
              margin: '2rem auto 0',
              paddingTop: '1.5rem',
              borderTop: '1px solid #f9a8d4',
              textAlign: 'center',
              fontSize: '0.75rem',
              color: '#9d174d',
            }}
          >
            © {new Date().getFullYear()} BloomCare. All rights reserved. Made with 💗 for expectant mothers everywhere.
          </div>
        </footer>
      </body>
    </html>
  )
}
