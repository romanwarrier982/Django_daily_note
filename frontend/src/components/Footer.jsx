import React from "react";
import { BiCopyright } from "react-icons/bi";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-4 bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
      <div className="flex justify-center items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
        <BiCopyright className="text-lg" />
        <span>{year} Randall Thomas</span>
      </div>
    </footer>
  );
};

export default Footer;
