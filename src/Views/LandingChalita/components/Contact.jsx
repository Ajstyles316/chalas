

export const Contact = () => {

    const handleSubmit = () => {
        e.preventDefault();
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="bg-[#FFE17F] rounded-lg p-8 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="nombre" className="block text-gray-800 mb-2 font-medium">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            required
                            className="w-full px-4 py-3 rounded bg-[#FFF5E6] border-none focus:ring-2 focus:ring-[#E85B81]"
                        />
                    </div>
                    <div>
                        <label htmlFor="telefono" className="block text-gray-800 mb-2 font-medium">
                            Telefono
                        </label>
                        <input
                            type="tel"
                            id="telefono"
                            required
                            className="w-full px-4 py-3 rounded bg-[#FFF5E6] border-none focus:ring-2 focus:ring-[#E85B81]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="correo" className="block text-gray-800 mb-2 font-medium">
                            Correo Electronico
                        </label>
                        <input
                            type="email"
                            id="correo"
                            required
                            className="w-full px-4 py-3 rounded bg-[#FFF5E6] border-none focus:ring-2 focus:ring-[#E85B81]"
                        />
                    </div>
                    <div>
                        <label htmlFor="evento" className="block text-gray-800 mb-2 font-medium">
                            Tipo de Evento
                        </label>
                        <input
                            type="text"
                            id="evento"
                            required
                            className="w-full px-4 py-3 rounded bg-[#FFF5E6] border-none focus:ring-2 focus:ring-[#E85B81]"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="consulta" className="block text-gray-800 mb-2 font-medium">
                        Consulta
                    </label>
                    <textarea
                        id="consulta"
                        required
                        rows="5"
                        placeholder="Escribe una breve descripción del error que tuviste"
                        className="w-full px-4 py-3 rounded bg-[#FFF5E6] border-none focus:ring-2 focus:ring-[#E85B81] resize-none"
                    ></textarea>
                </div>

                <p className="text-sm text-gray-600 italic mb-6">
                    (Todos los campos son requeridos)
                </p>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-[#E85B81] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#d64d73] transition-colors"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>  
    )
}