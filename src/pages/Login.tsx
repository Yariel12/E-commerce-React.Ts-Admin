import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { AuthService } from "../services/AuthService";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const userData = await AuthService.loginWithGoogle(credentialResponse);

      if (userData?.token) {
        localStorage.setItem("token", userData.token);
      }

      console.log("Usuario logueado en backend:", userData);

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Error al iniciar sesión con Google:", err?.message);
    }
  };

  const handleError = () => {
    console.log("Error al iniciar sesión con Google");
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="relative items-center justify-center flex-1 hidden overflow-hidden lg:flex bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
        <div className="absolute rounded-full w-72 h-72 bg-white/10 blur-3xl top-20 left-10 animate-pulse" />
        <div className="absolute rounded-full w-96 h-96 bg-purple-400/20 blur-3xl bottom-10 right-10 animate-pulse" />

        <div className="relative z-10 px-12 text-center">
          <ShoppingBag className="mx-auto mb-4 text-cyan-400" size={36} />
          <h1 className="font-serif text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-lg">
            SX Admin
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-center flex-1 p-4 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="w-full max-w-sm p-10 text-center transition-transform border shadow-2xl rounded-2xl bg-white/40 backdrop-blur-xl border-white/30 hover:translate-y-1 hover:shadow-3xl">
          <h2 className="mt-6 font-serif text-3xl text-gray-800 bold">
            Bienvenido
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Inicia sesión para continuar
          </p>

          <div className="flex justify-center mt-8">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              theme="outline"
              size="large"
              shape="pill"
              text="signin_with"
              width="280"
            />
          </div>

          <div className="relative flex items-center justify-center mt-10">
            <div className="absolute w-full border-t border-gray-300" />
            <span className="relative px-4 text-xs text-gray-500 bg-white/40 backdrop-blur-xl">
              Acceso seguro
            </span>
          </div>

          <footer className="mt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} Admin. Todos los derechos reservados.
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Login;
