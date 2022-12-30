import { ReactNode } from "react";
import Navbar from "./navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar />
      {children}
    </div>
  );
};

type LayoutProps = {
  children: ReactNode;
};

export default Layout;
