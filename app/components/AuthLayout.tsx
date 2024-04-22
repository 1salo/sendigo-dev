import Footer from "../Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </div>
  );
}
