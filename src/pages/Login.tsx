import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { PiAirplane } from "react-icons/pi";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthHook";

type Data = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<Data>();
  const { isAutenticate, setIsAutenticate } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAutenticate) {
      navigate("/dashboard");
    }
  }, [isAutenticate]);

  const onSubmit: SubmitHandler<Data> = async (data) => {
    const res = await fetch("http://localhost:3333/dorado/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      toast.error("Credenciales incorrectas");
      return;
    }

    if (res.status === 500) {
      toast.error("Error del servidor. Intenta de nuevo.");
      return;
    }

    if (res.status === 200) {
      toast.success("Inicio de sesión exitoso 🎉");
      setIsAutenticate(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d8d8d8] bg-cover bg-center px-4">
      <Toaster />
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
        <div className="flex items-center justify-center text-[#4f46e5] gap-2">
          <PiAirplane size={26} />
          <h3 className="text-2xl font-bold">Dorado Flights</h3>
        </div>

        <div className="text-center font-semibold text-gray-800">
          Ingresa tus credenciales
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <FaUser size={14} />
            </span>
            <input
              type="text"
              placeholder="Usuario"
              {...register("username", { required: true })}
              className="w-full pl-9 pr-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] placeholder-gray-500"
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <FaLock size={14} />
            </span>
            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: true })}
              className="w-full pl-9 pr-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4f46e5] hover:bg-[#4338ca] transition text-white font-semibold py-2 rounded-md"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
