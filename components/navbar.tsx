import React, { ReactNode } from "react";

type NavbarProps = { title: string; children?: ReactNode };

let Navbar = ({ title, children }: NavbarProps) => {
  return (
    <div className="flex w-screen px-2 py-3 justify-between items-center border-b border-gray-300 dark:border-gray-800">
      <div className="font-semibold text-lg">{title}</div>
      <div className="flex space-x-2">{children}</div>
    </div>
  );
};

export default Navbar;
