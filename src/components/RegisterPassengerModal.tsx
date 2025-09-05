
const RegisterPassengerModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
if (!isOpen) return null
return (
<div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
<div className="bg-white rounded-lg p-6 w-full max-w-md">
<h2 className="text-lg font-semibold mb-4">Registrar Pasajero</h2>
<form className="space-y-4">
<input className="w-full border px-3 py-2 rounded" placeholder="Nombres" />
<input className="w-full border px-3 py-2 rounded" placeholder="Apellidos" />
<input className="w-full border px-3 py-2 rounded" placeholder="Email" type="email" />
<input className="w-full border px-3 py-2 rounded" placeholder="Teléfono" />
<input className="w-full border px-3 py-2 rounded" placeholder="Código de vuelo" />
<div className="flex justify-end gap-2">
<button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
<button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Registrar</button>
</div>
</form>
</div>
</div>
)
}


export default RegisterPassengerModal