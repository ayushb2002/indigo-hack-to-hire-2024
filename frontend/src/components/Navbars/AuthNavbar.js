/*eslint-disable*/
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "context/authContext";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              Fly-with-Indigo
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/"
                >
                  <span className="inline-block ml-2">Home</span>
                </a>
              </li>

              {(!currentUser || currentUser.role == "customer") && (
                <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/search"
                >
                  <span className="inline-block ml-2">Search Flight</span>
                </a>
              </li>
              ) }
                
              {currentUser ? (
                <>
                <li className="flex items-center">
                  <a
                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    href="/profile"
                  >
                    <span className="inline-block ml-2">Profile</span>
                  </a>
                  </li>
                  <li className="flex items-center">
                  <a
                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    href="/admin"
                  >
                    <span className="inline-block ml-2">Dashboard</span>
                  </a>
                </li>
                <li className="flex items-center">
                  <Link to="/logout">
                    <a
                      className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                      href="#pablo" >
                      <span className="inline-block ml-2">Logout</span>
                    </a>
                  </Link>
                </li>
                
                </>
              ) : (
                <>
                <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/auth/login"
                >
                  <span className="inline-block ml-2">Login</span>
                </a>
                </li>
                <li className="flex items-center">
                <Link to="/auth/register">
                  <a
                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    href="/auth/register"
                  >
                    <span className="inline-block ml-2">Register</span>
                  </a>
                </Link>
              </li>
                  </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
