import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import '../globals.css'

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'MVP Calculator | Embed',
  description: 'Embeddable MVP Cost Calculator',
}

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
        `}</style>
      </head>
      <body className={`${geist.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
