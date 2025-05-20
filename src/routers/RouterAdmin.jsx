import Dashboard from '../components/backend/dashboard/index'
import Setting from '../components/backend/settings/index'
import UserList from '../components/backend/user/index';
import UserForm from '../components/backend/user/UserForm';
const RouterAdmin =[
    {path: "dashboard",element:<Dashboard/>,},
    {path: "users",element:<UserList/>,},
    { path: "users/create", element: <UserForm /> },
    { path: "users/edit/:id", element: <UserForm /> },
    {path: "settings",element:<Setting/>,},

]

export default RouterAdmin;