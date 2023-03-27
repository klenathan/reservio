import "./globals.css";

export const metadata = {
  title: "Reservio",
  description: "Reserve it? Reservio",
  icons: {
    icon: '/assets/profile.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
