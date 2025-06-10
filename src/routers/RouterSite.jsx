import Home from "../components/frontend/Home";
import LoginUser from "../components/frontend/user/LoginUser";
import ProfileUser from "../components/frontend/user/ProfileUser";
import RegisterUser from "../components/frontend/user/RegisterUser";
import PublicRoute from "./customRoute/PublicRoute";
import PrivateRoute from "./customRoute/PrivateRoute";
import GoogleSuccess from "../components/frontend/user/GoogleLogin/GoogleSuccess";
import TaskList from "../components/frontend/task/TaskList";
import AddTask from "../components/frontend/task/AddTask";
import TaskDetail from "../components/frontend/task/TaskDetail";
import AddGroup from "../components/frontend/group/AddGroup";
import GroupList from "../components/frontend/group/GroupList";

const RouterSite =[
    {path: "/",element: <Home />,},
    // CHẶN người đã đăng nhập vào login/register
  { path: "/dang-nhap", element: <PublicRoute element={<LoginUser />} /> },
  { path: "/dang-ky", element: <PublicRoute element={<RegisterUser />} /> },
  { path: "/dang-nhap-google-thanh-cong", element: <PublicRoute element={<GoogleSuccess />} /> },

  // CHỈ CHO người đã đăng nhập truy cập
  { path: "/ho-so", element: <PrivateRoute element={<ProfileUser />} /> },
  { path: "/danh-sach-cong-viec", element: <PrivateRoute element={<TaskList />} /> },
  { path: "/them-cong-viec-moi", element: <PrivateRoute element={<AddTask />} /> },
  { path: "/chi-tiet-cong-viec/:id", element: <PrivateRoute element={<TaskDetail/>} /> },
  //group
    { path: "/tao-nhom-moi", element: <PrivateRoute element={<AddGroup/>} /> },
    { path: "/danh-sach-nhom", element: <PrivateRoute element={<GroupList/>} /> },

]

export default RouterSite;