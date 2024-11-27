import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { User, Store, Phone, CreditCard, Mail, Lock, Calendar, CheckCircle } from 'lucide-react';
import chalitaLogo from '../../../assets/img/appLogo.jpeg'

export const RegisterProvider = () => {
    const navigate = useNavigate();
    const { registerProvider, registerProfile } = useAuth();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        celular: '',
        tiendaNombre: '',
        direccion: '',
        nroCarnet: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
        tipoEvento: [],
        metodoPago: '',
        numeroTarjeta: '',
        vcc: false,
        fechaVencimiento: '',
    });

    const categories = {
        Babys: ['Bautizos', 'Baby Shower', 'Sex Reveal'],
        Cumples: ['XV años', 'Cumple Infantil', 'Cumple Casual'],
        Fiestas: ['Corporativas', 'Casual'],
        Parejas: ['Bodas', 'Despedida de Soltero', 'Aniversario'],
    };

    const handleCheckboxChange = (category) => {
        setFormData((prevState) => {
            const selectedCategories = [...prevState.tipoEvento];
            if (selectedCategories.includes(category)) {
                selectedCategories.splice(selectedCategories.indexOf(category), 1);
            } else {
                selectedCategories.push(category);
            }
            return { ...prevState, tipoEvento: selectedCategories };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.vcc) {
            alert('Debe aceptar la suscripción mensual para continuar.');
            return;
        }

        if (formData.contrasena !== formData.confirmarContrasena) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        const today = new Date();
        const expirationDate = new Date(formData.fechaVencimiento);
        if (expirationDate <= today) {
            alert('La fecha de vencimiento de la tarjeta no es válida.');
            return;
        }

        try {
            console.log("Formulario enviado:", formData);
            const user = await registerProvider(formData);

            console.log("Usuario creado:", user);

            await registerProfile(user, formData);

            alert('Proveedor registrado exitosamente.');
            navigate('/DashboardProvider');
        } catch (error) {
            console.error('Error al registrar el proveedor:', error);
            alert('Hubo un error al registrar el proveedor.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-200 p-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2 bg-orange-600 p-8 text-white">
                        <h2 className="text-3xl font-bold mb-4">Bienvenido Proveedor</h2>
                        <p className="text-lg mb-6">Regístrate para ofrecer tus servicios y formar parte de nuestra comunidad de eventos.</p>
                        <img className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg" src={chalitaLogo} alt="Logo Chalita" />
                    </div>
                    <div className="md:w-1/2 p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                required
                                                className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Nombre"
                                                value={formData.nombre}
                                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                id="apellido"
                                                name="apellido"
                                                required
                                                className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Apellido"
                                                value={formData.apellido}
                                                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="tiendaNombre" className="block text-sm font-medium text-gray-700">Nombre de la tienda</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Store className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="tiendaNombre"
                                            name="tiendaNombre"
                                            required
                                            className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Nombre de la tienda"
                                            value={formData.tiendaNombre}
                                            onChange={(e) => setFormData({ ...formData, tiendaNombre: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección de la tienda</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Store className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="direccion"
                                            name="direccion"
                                            required
                                            className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Dirección de la tienda"
                                            value={formData.direccion}
                                            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label htmlFor="celular" className="block text-sm font-medium text-gray-700">Número de Teléfono</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                id="celular"
                                                name="celular"
                                                required
                                                className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Número de Teléfono"
                                                value={formData.celular}
                                                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-1/2">
                                        <label htmlFor="nroCarnet" className="block text-sm font-medium text-gray-700">Número de Carnet</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <CreditCard className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                id="nroCarnet"
                                                name="nroCarnet"
                                                required
                                                className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Número de Carnet"
                                                value={formData.nroCarnet}
                                                onChange={(e) => setFormData({ ...formData, nroCarnet: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="correo"
                                            name="correo"
                                            autoComplete="email"
                                            required
                                            className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Correo Electrónico"
                                            value={formData.correo}
                                            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña - Mínimo 6 caracteres</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            id="contrasena"
                                            name="contrasena"
                                            autoComplete="new-password"
                                            required
                                            className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Contraseña"
                                            value={formData.contrasena}
                                            onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="confirmarContrasena" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            id="confirmarContrasena"
                                            name="confirmarContrasena"
                                            autoComplete="new-password"
                                            required
                                            className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Confirmar Contraseña"
                                            value={formData.confirmarContrasena}
                                            onChange={(e) => setFormData({ ...formData, confirmarContrasena: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900">Categorías de eventos</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(categories).map(([category, subCategories]) => (
                                        <div key={category} className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id={category}
                                                    name={category}
                                                    type="checkbox"
                                                    onChange={() => handleCheckboxChange(category)}
                                                    checked={formData.tipoEvento.includes(category)}
                                                    className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor={category} className="font-medium text-gray-700">{category}</label>
                                                <p className="text-gray-500 text-xs">{subCategories.join(", ")}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 mt-6">
                                <h3 className="text-lg font-medium text-gray-900">Información de Pago</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="metodoPago" className="block text-sm font-medium text-gray-700">Método de Pago</label>
                                        <select
                                            id="metodoPago"
                                            name="metodoPago"
                                            value={formData.metodoPago}
                                            onChange={(e) => setFormData({ ...formData, metodoPago: e.target.value })}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                                        >
                                            <option value="">Seleccione un método</option>
                                            <option value="Visa">Visa</option>
                                            <option value="MasterCard">MasterCard</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="numeroTarjeta" className="block text-sm font-medium text-gray-700">Número de Tarjeta VCC</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <CreditCard className="h-5 w-5 text-gray-400" />
                                                <input
                                                    id="numeroTarjeta"
                                                    name="numeroTarjeta"
                                                    type="password"
                                                    placeholder="•••• •••• •••• ••••"
                                                    value={formData.numeroTarjeta}
                                                    onChange={(e) => setFormData({ ...formData, numeroTarjeta: e.target.value })}
                                                    required
                                                    className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="fechaVencimiento" className="block text-sm font-medium text-gray-700">Fecha de Vencimiento</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="fechaVencimiento"
                                                name="fechaVencimiento"
                                                type="month"
                                                value={formData.fechaVencimiento}
                                                onChange={(e) => setFormData({ ...formData, fechaVencimiento: e.target.value })}
                                                required
                                                className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="suscripcion"
                                            name="suscripcion"
                                            type="checkbox"
                                            checked={formData.vcc}
                                            onChange={(e) => setFormData({ ...formData, vcc: e.target.checked })}
                                            required
                                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="suscripcion" className="ml-2 block text-sm text-gray-900">
                                            Acepto realizar el pago mensual de 50 Bs.
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                    >
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <CheckCircle className="h-5 w-5 text-orange-500 group-hover:text-orange-400" aria-hidden="true" />
                                        </span>
                                        Registrarse
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

