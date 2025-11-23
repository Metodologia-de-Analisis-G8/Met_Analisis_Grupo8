// src/views/authentication/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("register", { name, email, password });
    // simulate next: verification popup
    navigate("/auth/verify");
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-8">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-[#7D848D]">Volver</button>
        </div>

        <h1 className="text-[20px] font-bold mt-6">Regístrate ahora</h1>
        <p className="text-sm text-[#7D848D] mt-2">Ingresa tus datos y crea tu cuenta</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="bg-[#F6F7FB] rounded-xl px-4 py-3">
            <input
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          <div className="bg-[#F6F7FB] rounded-xl px-4 py-3">
            <input
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          <div className="bg-[#F6F7FB] rounded-xl px-4 py-3 relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none pr-10"
              required
            />
            <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-3 text-[#7D848D]">
              {show ? "Ocultar" : "Ver"}
            </button>
          </div>

          <div className="text-sm text-[#7D848D]">Contraseña debe tener más de 8 caracteres</div>

          <button className="w-full bg-[#0A84FF] text-white py-3 rounded-xl mt-2">Iniciar</button>

          <div className="text-center text-sm text-[#7D848D]">
            Ya tengo una cuenta <Link to="/auth/login" className="text-[#0A84FF]">Iniciar sesión</Link>
          </div>
        </form>
      </div>

    </div>
  );
}
