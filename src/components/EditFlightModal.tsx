import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  openEditModal: boolean;
  setOpenEditModal: (openEditModal: boolean) => void;
  codF: string;
  setCodF: (codF: string) => void;
  setAccion: (action: boolean) => void;
  accion: boolean;
}

const EditFlightModal: React.FC<Props> = ({
  openEditModal,
  setOpenEditModal,
  codF,
  setCodF,
  setAccion,
  accion,
}) => {
  const { register, handleSubmit } = useForm();
  // Informacion de los vuelos:
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch("http://localhost:3333/dorado/destinos");
      const resp = await res.json();
      setData(resp.data);
    };
    loadData();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch(
        `http://localhost:3333/dorado/vuelos/editar/${codF}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      const resp = await res.json();

      if (resp.message === "Exito") {
        setAccion(!accion);
        setCodF("");
        setOpenEditModal(!openEditModal);
        return toast.success("Informacion actualizada");
      }
      return toast.error("Error al actualizar");
    } catch (e) {
      toast.error("Error al actualizar");
    }
  };

  if (!openEditModal) return null;
  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Editar Vuelo: {codF}</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <select
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("coddestino", { required: true })}
          >
            <option value="">-- Seleccione un destino --</option>
            {data.map((val) => (
              <option key={val.id} value={val.id}>
                {val.descripcion}
              </option>
            ))}
          </select>
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Nueva hora de salida"
            type="time"
            {...register("horasalida", { required: true })}
          />
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Nueva hora de llegada"
            type="time"
            {...register("horallegada", { required: true })}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setCodF("");
                setOpenEditModal(!openEditModal);
              }}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFlightModal;
