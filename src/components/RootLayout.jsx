import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import MainNavigation from "./MainNavigation";

const RootLayout = () => {
  return (
    <div className="d-flex flex-column flex-md-row min-vh-100">
      <MainNavigation />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <main className="flex-grow-1  bg-light">
        <Outlet />
      </main>
    </div>
  );
};


export default RootLayout;
