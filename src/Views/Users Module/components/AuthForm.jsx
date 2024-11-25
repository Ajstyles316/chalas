import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export const AuthForm = ({ formType, onSubmit, isHuman, setIsHuman, showPassword, setShowPassword, email, setEmail }) => (
    <form onSubmit={onSubmit} className="space-y-4">
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
        </div>
        <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
                {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
        </div>
        <div className="flex items-center mt-4">
            <ReCAPTCHA sitekey="6Ld134EqAAAAAGDUQXhbFtodSTi8jzJrrwI_bCUz" onChange={() => setIsHuman(true)} />
        </div>
        <button
            type="submit"
            // disabled={!isHuman}
            className={'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700'}
        >
            {formType === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
    </form>
);
