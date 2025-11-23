import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function AuthLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = () => {
      // Simula la verificación de inicio de sesión desde el caché
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (loggedIn) {
        // Redirige a la ruta home si está logeado
        // navigate("/app/dashboard", { replace: true }) por ejemplo
      }
    };

    setTimeout(() => {
      checkLoginStatus();
      setIsLoading(false);
    }, 1000); // Simula una carga de 1 segundo
  }, []);

  if (isLoading) {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontSize:"22px"}}>
      <span className="dots">Cargando...</span>
    </div>
  );
}

  return <Outlet />;
}

export default AuthLayout;
