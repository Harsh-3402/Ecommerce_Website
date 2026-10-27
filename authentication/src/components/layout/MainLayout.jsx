import Header from "./Header";
import Navbar from "./Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#19372f]">
      <Header />
      {children}
    </div>
  );
}

export default MainLayout;