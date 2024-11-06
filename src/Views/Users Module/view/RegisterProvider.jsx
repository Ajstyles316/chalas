import lamaBig from '../../../assets/img/llama_chill.png';
import logoL from '../../../assets/img/appLogo.jpeg';
import React, { useState } from 'react';
import '../styles/RegisterProvider.css';
import { useNavigate } from 'react-router';
import { auth, db } from '../../../Firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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
        nuevaContrasena: '',
        tipoEvento: ''  // Nuevo campo para el tipo de evento
    });
    const [mantenerContrasena, setMantenerContrasena] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');

    const categories = {
        "Cumples": "XV años, Cumple Infantil, Cumple Casual",
        "Babys": "Bautizos, Baby Shower, Sex Reveal",
        "Parejas": "Bodas, Despedida de Soltero, Aniversario",
        "Fiestas": "Corporativas, Casual"
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'tipoEvento') {
            setInfoMessage(categories[value] || '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, apellido, celular, nroCarnet, correo, contrasena, confirmarContrasena, tipoEvento } = formData;

        if (contrasena !== confirmarContrasena) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                firstName: nombre,
                lastName: apellido,
                phone: celular,
                idNumber: nroCarnet,
                email: correo,
                role: 'provider',
                isActive: true,
                eventType: tipoEvento  // Guardamos el tipo de evento en la base de datos
            });

            alert("Proveedor registrado exitosamente.");
            navigate('/provider');

        } catch (error) {
            console.error("Error al registrar el proveedor:", error);
            alert("Hubo un error al registrar el proveedor.");
        }
    };

    return (
        <div className="registration-container">
            <div className="lm-cnt-one">
                <img src={lamaBig} alt="Llama Chill" />
            </div>
            <div className="registration-card">
                <div className="logo">
                    <img src={logoL} alt="Logo Chalita" />
                </div>
                <h1>Bienvenido Proveedor</h1>
                <p className="subtitle">Todos los campos son obligatorios*</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="apellido"
                            placeholder="Apellido"
                            value={formData.apellido}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-row">
                        <input
                            type="tel"
                            name="celular"
                            placeholder="Celular"
                            value={formData.celular}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="nroCarnet"
                            placeholder="Número de Carnet"
                            value={formData.nroCarnet}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo Electrónico"
                        value={formData.correo}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="contrasena"
                        placeholder="Contraseña"
                        value={formData.contrasena}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="confirmarContrasena"
                        placeholder="Confirmar Contraseña"
                        value={formData.confirmarContrasena}
                        onChange={handleInputChange}
                    />

                    {/* Nuevo campo desplegable para el tipo de evento */}
                    <div className="form-row">
                        <select
                            name="tipoEvento"
                            value={formData.tipoEvento}
                            onChange={handleInputChange}
                            className="custom-select"
                        >
                            <option value="">Selecciona un tipo de evento</option>
                            {Object.keys(categories).map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    {infoMessage && (
                        <p className="info-message">Esta categoría incluye: {infoMessage}</p>
                    )}

                    <p className="info-text">
                        Tu nombre de usuario será tu nombre y apellido. Puedes mantener la misma contraseña que utilizas para tu correo si lo prefieres.
                    </p>

                    <button
                        type="button"
                        className="maintain-password-btn"
                        onClick={() => setMantenerContrasena(!mantenerContrasena)}
                    >
                        Mantener la misma contraseña
                    </button>

                    {!mantenerContrasena && (
                        <input
                            type="password"
                            name="nuevaContrasena"
                            placeholder="Nueva Contraseña"
                            value={formData.nuevaContrasena}
                            onChange={handleInputChange}
                        />
                    )}

                    <button type="submit" className="submit-btn">
                        Enviar
                    </button>

                </form>
            </div>
            <div className="lm-cnt-two">
                <img src={lamaBig} alt="Llama Chill" />
            </div>
        </div>
    );
};
