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
      slug: "/register",
      active: !isLoggedIn,
    },
    {
      name: "Adopt",
      slug: "/adopt",
      active: isLoggedIn,
    },
  ];

  return (
    <div className=" w-full bg-white sticky">
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
                     key={item.name}
                    className="text-black text-md rounded-xl px-3 py-3 font-semibold hover:bg-slate-100 hover:text-purple-700"
                    onClick={() =>{navigate(item.slug)}}
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
              bgColor="bg-purple-500"
              className="w-full "
              textColor="text-white"
              hover="hover:bg-purple-700 hover:text-white font-semibold"
              onClick={() =>{navigate("/login")}}
            >
              Login
            </Button>
          )}
        </div>
        
      </div>
      <hr className="border-b border-gray-200" />
    </div>
  );
}

export default NavBar;
