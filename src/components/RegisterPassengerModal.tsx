import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const RegisterPassengerModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  accion: boolean;
  setAccion:(accion:boolean) => void;
}) => {
  if (!isOpen) return null;

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState<any[]>([]);
    
    useEffect(()=>{
        const loadData = async ()=>{
          const res = await fetch('http://localhost:3333/dorado/infoflights')
          const respuesta = await res.json()
          setData(respuesta.data)
        }
        loadData()
      }, [])

  const onSubmit = async (data: any) => {
    const res = await fetch("http://localhost:3333/dorado/passenger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const respuesta = await res.json();

    console.log(respuesta);

    if(respuesta.message === 'Exito'){
        
        toast.success('Vuelo creado')
        onClose()
        return
    }
    return toast.error('No se pudo crear el vuelo')

  };

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Registrar Pasajero</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Nombres"
            {...register("nombres", { required: true })}
          />
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Apellidos"
            {...register("apellidos", { required: true })}
          />
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
          />
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Teléfono"
            {...register("telefono", { required: true })}
          />
          <label> Seleccionar codigo del vuelo</label>
          <select
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("codvuelo", { required: true })}
          >
            {data.map((val) => (
              <option key={val.id} value={val.id}>
                {val.id}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPassengerModal;
