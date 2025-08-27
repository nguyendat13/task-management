import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Layout from "./Layout";
import TaskPage from "../../components/frontend/task/TaskPage";

const Site = () => {
  return (
  <div className="flex flex-col min-h-screen bg-gray-900">
      <Layout>
        {/* Header */}
        <Header />

        {/* Nội dung chính */}
  <div className="flex flex-1 relative max-w-6xl mx-auto w-full px-2 md:px-6 py-6 gap-4">
          {/* Sidebar động (TaskPage → chứa TaskMenu) */}
          <TaskPage />

          {/* Main content */}
          <main className="relative z-10 flex-1 p-6 bg-gray-800 rounded-2xl shadow-lg overflow-y-auto min-h-[70vh] text-gray-100">
            <Outlet />
          </main>
        </div>
      </Layout>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Site;
