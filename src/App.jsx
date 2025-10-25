import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import CategoryList from "./pages/CategoryList.tsx";
import SideBar from "./layout/Sidebar.tsx";
import Login from "./pages/Login.tsx";
import ProductsList from "./pages/ProductsList.tsx";
import CategoryCreate from "./pages/CategoryCreate.tsx";
import ProductsCreate from "./pages/ProductsCreate.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
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

  const token = localStorage.getItem("token");
  const hideSidebarRoutes = ["/login"];
  const shouldHideSidebar = hideSidebarRoutes.includes(
    location.pathname.toLowerCase()
  );

  return (
    <div className="flex min-h-screen">
      {/* ✅ Mostrar SideBar solo si hay token o no está en login */}
      {token && !shouldHideSidebar && <SideBar />}

      <main className="flex-1">
        <Routes>
          {/* ✅ Redirección al iniciar */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 🔒 Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Category/Create"
            element={
              <ProtectedRoute>
                <CategoryCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Category/List"
            element={
              <ProtectedRoute>
                <CategoryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Products/List"
            element={
              <ProtectedRoute>
                <ProductsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Products/Create"
            element={
              <ProtectedRoute>
                <ProductsCreate />
              </ProtectedRoute>
            }
          />

          {/* ✅ Ruta pública */}
          <Route path="/login" element={<Login />} />

          {/* No existe */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
