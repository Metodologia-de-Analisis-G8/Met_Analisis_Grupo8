import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("reset", email);

    // mostrar popup
    setShowModal(true);
  };

  return (
    <div className="w-full h-screen bg-[#F2F2F7] flex flex-col overflow-hidden relative">

      {/* contenido normal */}
      <div className="flex-1 overflow-y-auto px-6 pt-8">
        <button className="text-[#7D848D]">Volver</button>

        <h1 className="text-[22px] font-bold mt-6">Reestablecer Contraseña</h1>
        <p className="text-sm text-[#7D848D] mt-2">Ingresa tu correo para reestablecer tu contraseña</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="bg-[#F6F7FB] rounded-xl px-4 py-3">
            <input
              placeholder="persona1.2025@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          <button className="w-full bg-[#0A84FF] text-white py-3 rounded-xl mt-2">
            Reestablecer contraseña
          </button>
        </form>
      </div>

      {/* MODAL estilo iOS */}
      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[80%] max-w-sm text-center">
            <div className="w-14 h-14 rounded-full mx-auto mb-4 bg-[#0A84FF] flex items-center justify-center text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM4 20v-1c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4z" fill="white"/></svg>
            </div>

            <h2 className="text-lg font-semibold">Verifica tu email</h2>
            <p className="text-sm text-[#7D848D] mt-1">
              Se han enviado los pasos para recuperar tu contraseña
            </p>

            <button
              onClick={() => navigate("/auth/login")}
              className="mt-4 w-full bg-[#0A84FF] text-white py-2 rounded-xl"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
