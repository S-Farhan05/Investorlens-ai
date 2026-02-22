

export const metadata = {
  title: 'InvestorLens AI',
  description: 'AI-powered investment analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}