import React from "react";
import Logo from "../../assets/Logo.png";
import LogoutButton from "../Utility/LogoutButton";
import { Button } from "../Utility";
import useMyStore from "../../Store/ZustandStore.js";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const isLoggedIn = useMyStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: "true",
    },
    {
      name: "Login",
      slug: "/login",
      active: !isLoggedIn,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !isLoggedIn,
    },
    {
      name: "Adopt",
      slug: "/adopt",
      active: isLoggedIn,
    },
  ];

  return (
    <div className="relative w-full bg-rose-100 p-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>Pawsome</span>
        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {navItems.map((item) => {
              if (item.active) {
                console.log(item.name);
                return (
                  <li
                    className="text-black text-md "
                    onClick={navigate(item.slug)}
                  >
                   <button>
                   {item.name}
                   </button>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div class="hidden lg:block">
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <Button
              bgColor="bg-rose-400"
              className="w-full "
              textColor="text-white"
              hover="hover:bg-rose-500 hover:text-white"
            >
              {" "}
              Login
            </Button>
          )}
        </div>
        <div class="lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6 cursor-pointer"
          >
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
