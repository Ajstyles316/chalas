import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../Firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import logoL from '../../../assets/img/appLogo.jpeg';
import '../styles/RegisterProvider.css'

export const RegisterProvider = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        celular: '',
        nroCarnet: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
        tipoEvento: []
    });

    const categories = {
        "Babys": ["Bautizos", "Baby Shower", "Sex Reveal"],
        "Cumples": ["XV años", "Cumple Infantil", "Cumple Casual"],
        "Fiestas": ["Corporativas", "Casual"],
        "Parejas": ["Bodas", "Despedida de Soltero", "Aniversario"]
    };

    const handleCheckboxChange = (category) => {
        setFormData(prevState => {
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
        const { nombre, apellido, celular, nroCarnet, correo, contrasena, confirmarContrasena } = formData;

        if (contrasena !== confirmarContrasena) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
            const user = userCredential.user;

            await setDoc(doc(db, 'provider', user.uid), {
                firstName: nombre,
                lastName: apellido,
                phone: celular,
                idNumber: nroCarnet,
                email: correo,
                role: 'provider',
                isActive: true,
                eventType: formData.tipoEvento,
                createdAt: new Date().toISOString(),
            });

            alert("Proveedor registrado exitosamente.");
            navigate('/provider');
        } catch (error) {
            console.error("Error al registrar el proveedor:", error);
            alert("Hubo un error al registrar el proveedor.");
        }
    };

    return (
        <div className=" w-screen min-h-screen flex items-center justify-center gap-12 p-4 bg-gradient-to-b from-amber-100 to-orange-300">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <div>
                    <img className="mx-auto h-24 w-auto rounded-full border-4 border-orange-500" src={logoL} alt="Logo Chalita" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Bienvenido Proveedor
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Regístrate para ofrecer tus servicios
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="nombre" className="sr-only">Nombre</label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Nombre"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="apellido" className="sr-only">Apellido</label>
                            <input
                                id="apellido"
                                name="apellido"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Apellido"
                                value={formData.apellido}
                                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="celular" className="sr-only">Número de Teléfono</label>
                            <input
                                id="celular"
                                name="celular"
                                type="tel"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Número de Teléfono"
                                value={formData.celular}
                                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="nroCarnet" className="sr-only">Número de Carnet</label>
                            <input
                                id="nroCarnet"
                                name="nroCarnet"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Número de Carnet"
                                value={formData.nroCarnet}
                                onChange={(e) => setFormData({ ...formData, nroCarnet: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="correo" className="sr-only">Correo Electrónico</label>
                            <input
                                id="correo"
                                name="correo"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Correo Electrónico"
                                value={formData.correo}
                                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="contrasena" className="sr-only">Contraseña</label>
                            <input
                                id="contrasena"
                                name="contrasena"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                                value={formData.contrasena}
                                onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmarContrasena" className="sr-only">Confirmar Contraseña</label>
                            <input
                                id="confirmarContrasena"
                                name="confirmarContrasena"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                                placeholder="Confirmar Contraseña"
                                value={formData.confirmarContrasena}
                                onChange={(e) => setFormData({ ...formData, confirmarContrasena: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Seleccione las categorías de eventos:</h3>
                        <div className="space-y-4">
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
                                        <p className="text-gray-500">Incluye: {subCategories.join(", ")}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};