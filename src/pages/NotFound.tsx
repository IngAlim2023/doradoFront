import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center gap-2">
      <div className="text-3xl font-bold">404</div>
      <div>
      No se encuentra la pagina
      </div>
      <button className="bg-sky-700 rounded-xl p-2 text-white hover:cursor-pointer hover:bg-sky-500 font-bold" onClick={()=>navigate('/')}>Volver</button>
    </div>
  );
};

export default NotFound;
