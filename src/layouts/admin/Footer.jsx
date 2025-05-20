import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-neutral-300 p-4 text-center">
      © {new Date().getFullYear()} Task Manager. All rights reserved.
    </footer>
  );
};

export default Footer;
