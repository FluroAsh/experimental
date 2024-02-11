import '@/app/ui/global.css';
import clsx from 'clsx';

import { Inter, Lusitana } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lusitana', // Variable required for setting the font for Tailwind
});

const fontVariables = `${inter.variable} ${lusitana.variable}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(fontVariables, 'font-inter antialiased')}>
        {children}
      </body>
    </html>
  );
}
