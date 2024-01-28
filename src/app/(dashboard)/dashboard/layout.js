import DashboardLayout from "src/components/dashboard/layout/layout";
import "src/app/globals.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
