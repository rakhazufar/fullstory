import "@styles/globals.css";
import { Inter } from "next/font/google";
import Nav from "@components/Nav";
import Provider from "./store/context/AuthContext";
import StyleProvider from "@app/store/providers/StyleProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fullstory",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main">
          <div className="gradient" />
        </div>
        <div className="app">
          <StyleProvider>
            <Provider>
              <Nav />
              {children}
            </Provider>
          </StyleProvider>
        </div>
      </body>
    </html>
  );
}
