import React from 'react';

export const AuthProviders = ({ handleGoogleSignIn, handleFacebookSignIn, googleLogo, facebookLogo }) => (
    <div className="mt-6 grid grid-cols-2 gap-3">
        <button onClick={handleGoogleSignIn} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <img className="w-5 h-5 mr-2" src={googleLogo} alt="Google Logo" />
            Google
        </button>
        <button onClick={handleFacebookSignIn} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <img className="w-5 h-5 mr-2" src={facebookLogo} alt="Facebook Logo" />
            Facebook
        </button>
    </div>
);
