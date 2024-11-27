import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { addDoc, collection, doc, getDocs, getFirestore, onSnapshot } from 'firebase/firestore'
import appFirebase from '../../../Firebase/config'

const db = getFirestore(appFirebase)
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    { sender: 'bot', text: "¡Hola! Bienvenido a mi servicio de organización de eventos. Estoy aquí para ayudarte a planificar y ejecutar tu evento especial, ya sea una boda, un cumpleaños, un baby shower o cualquier otra ocasión. Con mi experiencia y atención al detalle, me aseguraré de que tu evento sea un éxito. ¿Cómo puedo ayudarte?" },
  ]);
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState('');
  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };

    const botResponse = { sender: 'bot', text: 'Dejame pensarlo....' };
    setMessages([...messages, userMessage]);
    try {
      // Referencia a la colección "usuarios"
      const coleccionChats = collection(db, "consultas");

      // Datos a agregar
      const nuevoPrompt = {
        prompt: `Quiero que respondas al siguiente prompt de un cliente: ${input.trim()}`,
        creadoEn: new Date()
      };
      // Agregar documento
      const respuesta = await addDoc(coleccionChats, nuevoPrompt);
      const docRef = doc(db, "consultas", respuesta.id);
      // Establecer un listener para obtener la respuesta cuando se actualice
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();

          // Verifica si ya se ha completado el proceso y la respuesta está disponible
          if (data.response && data.status.state === "COMPLETED") {

            const botResponse = {
              sender: 'bot',
              text: data.response // Usa la respuesta recuperada de Firestore
            };

            // Actualiza el estado para mostrar la respuesta del bot
            setMessages((prevMessages) => [...prevMessages, botResponse]);

            // Detener la escucha del documento si ya tienes la respuesta
            unsubscribe();
          }
        }
      });
    } catch (err) {
      console.error("Error al enviar el prompt: ", err);
      //      setError('Hubo un error al agregar el usuario. Inténtalo de nuevo.');
    } finally {
      //      setCargando(false);
    }
    // Simulación de respuesta del bot
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);

    setInput('');
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(e);
      setInput('');
    }
  };

  // Función para hacer scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cada vez que los mensajes cambien, hacer scroll al último mensaje
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-gradient-to-r from-gray-500 to-gray-800 text-black p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold text-white">Asistente Virtual</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">

            <div className="chat-container h-96 p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`inline-flex text-gray-100 p-3 rounded-lg mb-2 message ${msg.sender === 'bot' ? 'bg-gray-900' : 'bg-gray-700'}`}>{msg.text}</div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

          </div>
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleSend}
                className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
              >Enviar</button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

