import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://fairbanksautoauction.com"),
  title: {
    default: "Fairbanks Auto Auction | Weekly Vehicle Auctions in Fairbanks, AK",
    template: "%s | Fairbanks Auto Auction",
  },
  description:
    "Fairbanks Auto Auction runs a live vehicle auction every Saturday at 1665 Richardson Hwy. Cars, trucks, SUVs, snow machines, and equipment — open to the public and dealers, no license required.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body">{children}</body>
    </html>
  );
}
