import React, { useState } from 'react'
import { CheckCircle2, X } from 'lucide-react'
import { textTerms } from '../services/textTerms'

export const UserTerms = ({ onAccept = () => { } }) => {
    const [accepted, setAccepted] = useState(false)
    const [isOpen, setIsOpen] = useState(true)

    const handleAccept = () => {
        onAccept()
        setIsOpen(false)
    }
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">Términos y Condiciones</h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 max-h-96 overflow-y-auto">
                    <p className="text-gray-700 mb-4">
                        {textTerms.parragraph}
                    </p>
                </div>
                <div className="p-6 border-t">
                    <label className="flex items-center mb-4 cursor-pointer">
                        <div className="mr-2 bg-gray-200 rounded-full p-1" onClick={() => setAccepted(!accepted)}>
                            {accepted ? (
                                <CheckCircle2 className="text-green-500" size={20} />
                            ) : (
                                <div className="w-5 h-5 rounded-full" />
                            )}
                        </div>
                        <span className="text-sm text-gray-700">He leído y acepto los términos y condiciones</span>
                    </label>
                    <button
                        onClick={handleAccept}
                        disabled={!accepted}
                        className={`w-full py-2 px-4 rounded ${accepted
                            ? 'bg-orange-600 hover:underline text-white '
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    )
}