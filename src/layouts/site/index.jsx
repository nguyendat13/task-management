import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Layout from './Layout';

const Site = () => {
  return (
    <div>
      <Layout>
      <Header />
       <Outlet />
     </Layout>
      <Footer />
    </div>
  );
};

export default Site;
