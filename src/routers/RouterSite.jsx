import Home from "../components/frontend/Home";
import TaskList from "../components/frontend/TaskList";
import LoginUser from "../components/frontend/user/LoginUser";
import RegisterUser from "../components/frontend/user/RegisterUser";


const RouterSite =[
    {path: "/",element: <Home />,},
    {path: "/dang-nhap",element: <LoginUser />,},
    {path: "/dang-ky",element: <RegisterUser />,},

    {path: "/danh-sach-cong-viec",element: <TaskList />,},
]

export default RouterSite;