
const CreateFlightModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
if (!isOpen) return null
return (
<div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
<div className="bg-white rounded-lg p-6 w-full max-w-md">
<h2 className="text-lg font-semibold mb-4">Crear Vuelo</h2>
<form className="space-y-4">
<input className="w-full border px-3 py-2 rounded" placeholder="Código de vuelo" />
<input className="w-full border px-3 py-2 rounded" placeholder="Aerolínea" />
<input className="w-full border px-3 py-2 rounded" placeholder="Destino" />
<input className="w-full border px-3 py-2 rounded" placeholder="Hora de salida" type="time" />
<input className="w-full border px-3 py-2 rounded" placeholder="Hora de llegada" type="time" />
<div className="flex justify-end gap-2">
<button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
<button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Guardar</button>
</div>
</form>
</div>
</div>
)
}


export default CreateFlightModal