import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModalProvider } from "@/components/ModalContext";
import AddExpenseModal from "@/components/AddExpenseModal";
import EditExpenseModal from "@/components/EditExpenseModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import AddIncomeModal from "@/components/AddIncomeModal";
import EditIncomeModal from "@/components/EditIncomeModal";
import AddBudgetModal from "@/components/AddBudgetModal";
import EditBudgetModal from "@/components/EditBudgetModal";
import ExportReportModal from "@/components/ExportReportModal";
import UserProfileModal from "@/components/UserProfileModal";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Modern Fiscal Intelligence | Professional Expense Tracking",
  description: "The ultimate professional SaaS expense tracker designed for modern founders and meticulous professionals. Control every cent with automated insights and military-grade security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} bg-background dark:bg-on-background text-on-surface dark:text-on-primary-container font-body-md overflow-x-hidden antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <ModalProvider>
            {children}
            <AddExpenseModal />
            <EditExpenseModal />
            <DeleteConfirmModal />
            <AddIncomeModal />
            <EditIncomeModal />
            <AddBudgetModal />
            <EditBudgetModal />
            <ExportReportModal />
            <UserProfileModal />
            <ChangePasswordModal />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
