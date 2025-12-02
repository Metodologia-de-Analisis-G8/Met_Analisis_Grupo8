import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("respuesta backend:", data);

    if (data.status === "success") {
      toast.success("Bienvenido 👋");
      navigate("/");
    } else {
      toast.error("Credenciales incorrectas");
    }
  };
  
  return (
    <div className="w-full h-screen bg-white flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-8">
        {/* title */}
        <h1 className="text-[32px] font-bold leading-[42px] text-[#1B1E28] mt-8 text-center">
          Iniciar Sesión<br />
        </h1>
        <h2 className="text-[16px] font-medium leading-[24px] text-[#7D848D] mt-2 text-center">
          Inicie Sesión para continuar
        </h2>

        {/* form */}
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="bg-[#F6F7FB] rounded-xl px-4 py-3">
            <label className="text-xs text-[#7D848D]">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="persona1.2025@gmail.com"
              className="w-full bg-transparent outline-none mt-1 text-sm"
              required
            />
          </div>

          <div className="bg-[#F6F7FB] rounded-xl px-4 py-3 relative">
            <label className="text-xs text-[#7D848D]">Contraseña</label>
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              className="w-full bg-transparent outline-none mt-1 text-sm pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-[38px] text-[#7D848D] text-sm"
            >
              {show ? "Ocultar" : "Ver"}
            </button>
          </div>

          <div className="flex justify-end">
            <Link to="/auth/forgot-password" className="text-sm text-[#0A84FF]">Olvidaste tu contraseña?</Link>
          </div>

          <button type="submit" className="w-full bg-[#0A84FF] text-white py-3 rounded-xl mt-2">Iniciar</button>

          <div className="text-center text-sm text-[#7D848D]">
            ¿No tienes una cuenta? <Link to="/auth/register" className="text-[#0A84FF]">Registrarse</Link>
          </div>

          <div className="h-[90px] bg-white shadow-lg rounded-t-[25px] flex justify-around items-center">
            <div className="text-[#7D848D]">O inicia sesión con</div>
            {/* social icons - placeholder images in img */}
            <img src="/img/fb.png" alt="facebook" className="w-10 h-10" />
            <img src="/img/ig.png" alt="instagram" className="w-10 h-10" />
            <img src="/img/x.png" alt="twitter" className="w-10 h-10" />
          </div>
        </form>
      </div>
    </div>
  );
}
