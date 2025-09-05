# Task Management Web App

Ứng dụng web quản lý công việc cá nhân hoặc theo nhóm. Người dùng có thể tạo nhóm, phân công nhiệm vụ và theo dõi tiến độ một cách cộng tác.  
Ứng dụng được xây dựng với **React.js + TailwindCSS** cho frontend và **ASP.NET Core Web API + Entity Framework Core** cho backend, sử dụng **MySQL** làm cơ sở dữ liệu.

---

## Chức năng chính

### Người dùng
- Đăng ký, đăng nhập và phân quyền người dùng.  

### Nhóm
- Tạo hoặc tham gia nhóm bằng mã nhóm.  
- Quản lý thành viên nhóm (Leader, Member).  

### Nhiệm vụ
- Tạo và phân công nhiệm vụ cho các thành viên trong nhóm.  
- Theo dõi trạng thái nhiệm vụ (Pending, In Progress, Done).  
- Giám sát tiến độ công việc thông qua trạng thái cập nhật.  

### Hệ thống
- Giao tiếp giữa frontend và backend thông qua RESTful API.  

---

## Công nghệ sử dụng

### Frontend
- [React.js](https://reactjs.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- React Router, Axios  

### Backend
- [ASP.NET Core Web API](https://dotnet.microsoft.com/en-us/apps/aspnet)  
- [Entity Framework Core (EF Core)](https://learn.microsoft.com/en-us/ef/core/)  
- JWT Authentication  
- RESTful API design  

### Database
- [MySQL](https://www.mysql.com/)  

---

## Cách cài đặt và chạy dự án

### 1. Clone repository
```bash
	git clone https://github.com/nguyendat13/fruit-store.git

### 2. Di chuyển vào thư mục backend
	cd fruit-store

### 3. Khôi phục các package
	dotnet restore

### 4. Chạy migration và khởi tạo database
	dotnet ef database update

### 5. Chạy dự án
	dotnet run
---

## Liên hệ

Nếu bạn có bất kỳ thắc mắc hoặc góp ý nào, vui lòng tạo issue hoặc liên hệ trực tiếp qua:

Email: dat48421@gmail.com

GitHub: nguyendat13

---

## Các lệnh khác
dotnet watch run

Chạy ứng dụng và tự động theo dõi thay đổi file (phù hợp cho phát triển và gỡ lỗi).

dotnet build

Biên dịch ứng dụng và tất cả các phụ thuộc.

dotnet publish

Biên dịch và đóng gói ứng dụng cho môi trường production vào thư mục bin/Release/netX/publish.
Thay netX bằng phiên bản .NET tương ứng (ví dụ: net6.0).

dotnet test

Chạy tất cả unit test trong solution (nếu có).

---


## Cấu trúc dự án
├── Controllers/      # API hoặc MVC controllers
├── Models/           # Các model dữ liệu hoặc entity
├── Data/             # Database context và seeding
├── Services/         # Business logic
├── Program.cs        # Điểm khởi đầu của ứng dụng
└── appsettings.json  # File cấu hình ứng dụng
