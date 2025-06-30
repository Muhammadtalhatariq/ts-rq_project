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
     {
      name: "Add Product",
      link: "/addproduct",
    },
  ];

  return (
    <>
      <div>
        <ul className="flex gap-4 items-center">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="cursor-pointer hover:text-white duration-700 font-semibold"
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
