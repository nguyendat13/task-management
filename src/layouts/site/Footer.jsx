import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-gray-400 py-6 shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
        {/* Bản Quyền */}
        <div className="text-center text-sm md:text-base">
          © {new Date().getFullYear()} <span className="text-orange-500 font-semibold">Task Manager</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
