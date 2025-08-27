import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 border-t border-gray-800 text-gray-300 py-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center">
        {/* Bản Quyền */}
        <div className="text-center text-xs md:text-sm">
          © {new Date().getFullYear()} <span className="text-blue-300 font-semibold">Todo Task App</span>. Bản quyền thuộc về nhóm phát triển.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
