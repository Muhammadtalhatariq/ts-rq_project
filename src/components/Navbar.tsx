import React from "react";
import { NavLink } from "react-router-dom";

interface NavItems {
  name: string;
  link: string;
}

const Navbar: React.FC = () => {
  const navItems: NavItems[] = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Products",
      link: "/products",
    },
  ];

  return (
    <>
      <div>
        <ul className="flex gap-4 items-center">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="cursor-pointer hover:font-semibold hover:text-white duration-700"
            >
              <NavLink to={item.link}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
