import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import useAuthContext from "../context/AuthHook";
import { useNavigate } from "react-router-dom";
type Data={
    username:string;
    usernameRequired:string;
    password:string;
    passwordRequired:string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<Data>();
  const { isAutenticate, setIsAutenticate } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAutenticate) {
      navigate("/dashboard");
    }
  }, [isAutenticate]);

  const onSubmit:SubmitHandler<Data> = async (data) => {
    const res = fetch("http://localhost:3333/dorado/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify(data),
    });

    const respuesta = await res;

    if (respuesta.status === 401) return alert("Credenciales incorrectas");
    if (respuesta.status === 500) return alert("Error vuelve a intentarlo");
    if (respuesta.status === 200) {
      setIsAutenticate(true);
      navigate("/dashboard");
    }
  };
  return (
    <div className="h-[75vh] w-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="m-4">
          <h3 className="text-center font-bold text-2xl">Iniciar sesión</h3>
        </div>
        <div>
          <p className="text-gray-500">Ingresa tus credenciales</p>
        </div>
        <form
          className="flex flex-col gap-2 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            className="text-center border-indigo-200 border-b-2 focus:outline-none focus:border-indigo-300"
            placeholder="username"
            {...register("username", { required: true })}
          />

          <input
            type="password"
            className="text-center border-indigo-200 border-b-2 focus:outline-none focus:border-indigo-300"
            placeholder="password"
            {...register("password", { required: true })}
          />
          <button className="rounded-lg bg-indigo-600 hover:bg-indigo-800 transition text-white p-1">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
