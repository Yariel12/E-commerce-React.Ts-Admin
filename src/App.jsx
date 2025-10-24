import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import CategoryList from "./pages/CategoryList.tsx";
import SideBar from "./layout/Sidebar.tsx";
import Login from "./pages/Login.tsx";
import CategoryCreate from "./pages/CategoryCreate.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <AppContent />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const hideSidebarRoutes = ["/login"];

  const shouldHideSidebar = hideSidebarRoutes.includes(
    location.pathname.toLowerCase()
  );

  return (
    <div className="flex min-h-screen">
      {!shouldHideSidebar && <SideBar />}

      <main className="flex-1">
        <Routes>
          <Route path="/Category/Create" element={<CategoryCreate />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/Category/List" element={<CategoryList />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
