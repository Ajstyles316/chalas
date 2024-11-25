import React, { useState } from 'react';
import { AlertCircle, Send } from 'lucide-react';

export default function Complaints() {
  const [complaint, setComplaint] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-md p-3">
      <div className="flex items-center mb-2">
        <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
        <h2 className="text-md font-semibold">Buzón de Quejas </h2>
      </div>

      <textarea
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
        placeholder="Describe tu queja aquí..."
        className="w-full h-10 p-2 text-xs border rounded-lg resize-none mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      />

      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500"></p>
        <button className="flex items-center space-x-2 bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 transition">
          <span>Enviar</span>
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
