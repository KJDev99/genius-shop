import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MobileBottomNav from "@/components/mobile-bottom-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://geniusstorerf.ru"),
  title: {
    default: "Genius Store — магазин оригинальной техники Apple, Samsung, Dyson в СПб",
    template: "%s",
  },
  description: "Genius Store — магазин оригинальной техники Apple, Samsung, Dyson в Санкт-Петербурге. Невский проспект, 32-34",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  verification: {
    google: "WA7xXr6IRhIxUsuAKagUJGLPYen_U8PoH-BEYCpCUws",
    yandex: "98ccf7e466d3b32d",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <head>
        {/* Картинки баннеров и каталога грузятся с этого домена — заранее открываем соединение. */}
        <link rel="preconnect" href="https://admin.geniusstorerf.ru" />
        <link rel="dns-prefetch" href="https://admin.geniusstorerf.ru" />
      </head>
      <body className={`${geistSans.className} min-h-full flex flex-col bg-[#F4F4FA] pb-[80px] lg:pb-0 overflow-x-clip`}>
        <Navbar />

        {children}

        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
