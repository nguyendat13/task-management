import React from 'react';

const Layout = ({ children }) => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(https://bizweb.dktcdn.net/100/523/245/themes/978296/assets/home_slider_item_imagelg_1.jpg?1733197605299)' }}
    >
      {children}
    </div>
  );
};

export default Layout;
