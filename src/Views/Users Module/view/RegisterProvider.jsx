import lamaBig from '../../../assets/img/llama_chill.png';
import logoL from '../../../assets/img/appLogo.jpeg';
import React, { useState } from 'react';
import '../styles/RegisterProvider.css';
import { useNavigate } from 'react-router';
import { auth, db } from '../../../Firebase/config'; // Asegúrate de tener tu configuración de Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const RegisterProvider = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        idNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        newPassword: ''
    });
    const [maintainPassword, setMaintainPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, phone, idNumber, email, password, confirmPassword } = formData;

        // Validar si las contraseñas coinciden
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            // Crear el usuario en Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Guardar los datos del usuario en Firestore
            await setDoc(doc(db, 'users', user.uid), {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                idNumber: idNumber,
                email: email,
                role: 'provider'
            });

            // Mostrar mensaje de éxito
            alert("Provider registered successfully.");

            // Redirigir a /provider después del registro exitoso
            navigate('/provider');

        } catch (error) {
            console.error("Error registering provider:", error);
            alert("There was an error registering the provider.");
        }
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
                <h1>Welcome Provider</h1>
                <p className="subtitle">All fields are required*</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-row">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="idNumber"
                            placeholder="ID Number"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />

                    <p className="info-text">
                        Your username will be your first and last name. You can keep the same password you use for your email, if you prefer.
                    </p>

                    <button
                        type="button"
                        className="maintain-password-btn"
                        onClick={() => setMaintainPassword(!maintainPassword)}
                    >
                        Keep same password
                    </button>

                    {!maintainPassword && (
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                        />
                    )}

                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
            <div className="lm-cnt-two">
                <img src={lamaBig} alt="NoFurulowe" />
            </div>
        </div>
    );
};
