import { NavLink, Outlet } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { LiaSearchSolid } from "react-icons/lia";
import { MdLogin } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { AuthStatus, useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";

const Navbar = () => {
  const { status, logout, authenticate } = useAuth();

  useEffect(() => {
    authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav className="top-navbar">
        <div className="container">
          <ul>
            <li>
              <NavLink to={"/"}>
                <IoHomeOutline className="icon-size" />
              </NavLink>
            </li>
            <li>
              <NavLink to={"/recherche"}>
                <LiaSearchSolid className="icon-size" />
              </NavLink>
            </li>
            {status === (AuthStatus.Guest || AuthStatus.Unknown) && (
              <>
                <li>
                  <NavLink to={"/login"}>
                    <MdLogin className="icon-size" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/inscription"}>
                    <IoPersonAddOutline className="icon-size" />
                  </NavLink>
                </li>
              </>
            )}
            {status === AuthStatus.Authenticated && (
              <>
                <li>
                  <NavLink to={"/compte"} title="Mon compte">
                    <MdAccountCircle className="icon-size" />
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={logout} to={"/"} title="Déconnexion">
                    <FiLogOut className="icon-size" />
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
