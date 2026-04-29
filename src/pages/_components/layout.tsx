import Footer from "./_base/footer";
import Header from "./_base/header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="mt-33">{children}</div>
      <Footer />
    </div>
  );
}
