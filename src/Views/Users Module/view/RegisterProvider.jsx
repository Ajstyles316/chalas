import lamaBig from '../../../assets/img/llama_chill.png'
import logoL from '../../../assets/img/appLogo.jpeg'
import React, { useState } from 'react';
import '../styles/RegisterProvider.css'

export const RegisterProvider = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        celular: '',
        nroCarnet: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
        nuevaContrasena: ''
    });
    const [maintainPassword, setMaintainPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div className="registration-container">
            <div className="lm-cnt-one">
                <img src={lamaBig} alt="NoFurulowe" />
            </div>
            <div className="registration-card">
                <div className="logo">
                    <img src={logoL} alt="Chalita Logo" />
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
                            placeholder="Nro de Carnet"
                            value={formData.nroCarnet}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo electronico"
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

                    <p className="info-text">
                        Tu usuario será tu nombre y apellido. Puedes mantener la misma contraseña que usas en tu correo, si lo prefieres.
                    </p>

                    <button
                        type="button"
                        className="maintain-password-btn"
                        onClick={() => setMaintainPassword(!maintainPassword)}
                    >
                        Mantener contraseña
                    </button>

                    {!maintainPassword && (
                        <input
                            type="password"
                            name="nuevaContrasena"
                            placeholder="Nueva Contraseña"
                            value={formData.nuevaContrasena}
                            onChange={handleInputChange}
                        />
                    )}

                    <button type="submit" className="submit-btn">
                        Aceptar
                    </button>
                </form>
            </div>
            <div className="lm-cnt-two">
                <img src={lamaBig} alt="NoFurulowe" />
            </div>
        </div>
    );
}