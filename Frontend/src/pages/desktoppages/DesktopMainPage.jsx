import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "./styles/desktopmainpage.css";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import BreadCrum from "../../components/BreadCrum";

function DesktopMainPage() {
  return (
    <div className="desktopmainpagecontainer">
      <Sidebar />
      <div className="desktopmainpagecontent">
        <Header children={<SearchBar />} />
        <BreadCrum />
        <Outlet />
      </div>
    </div>
  );
}

export default DesktopMainPage;
