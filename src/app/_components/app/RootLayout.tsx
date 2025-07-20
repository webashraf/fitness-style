// app/layout.tsx
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AntD Dashboard",
  description: "Next.js + Ant Design Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1677ff", // Customize AntD color
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
