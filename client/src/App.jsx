import { Outlet } from "react-router-dom";
import Navbar from "./components/pages/layout/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
