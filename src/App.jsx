import { useRoutes } from 'react-router-dom';
import React from 'react';
import RouterSite from './routers/RouterSite';
import RouterAdmin from './routers/RouterAdmin';
import Site from './layouts/site/index';
import Admin from './layouts/admin/index';

function App() {
  let element = useRoutes([
    {
      path: '/',
      element: <Site />,
      children: RouterSite,
    },
    {
      path: 'admin',
      element: <Admin/>,
      children: RouterAdmin,
    },
  ]);
  return element;
}

export default App;
