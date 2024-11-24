import React from 'react';
import lamaPutada from '../../../assets/img/llama_putada.png';
import lamaAngry from '../../../assets/img/llama_angry.png';
import lamaBanio from '../../../assets/img/llama_audifono.png';
import lamaEsquizo from '../../../assets/img/llama_esquizo.png';
import lamaStupid from '../../../assets/img/llama_stupid.png';
import lamahistory from '../../../assets/img/llama_bufanda.png';
import lamamission from '../../../assets/img/lamaprubea.png'

export const LandingAboutUsBody = () => {
  const teamMembers = [
    { name: 'Alina Ruiz', role: 'CEO', image: lamaPutada },
    { name: 'Jorge Llave', role: 'CTO', image: lamaAngry },
    { name: 'Fabricio Choque', role: 'Diseñador UX', image: lamaBanio },
    { name: 'Jose Fox Ontiveros', role: 'Desarrollador Full Stack', image: lamaEsquizo },
    { name: 'Kevin Morales', role: 'Gerente de Marketing', image: lamaStupid },
  ];

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#975F7C] mb-8 text-center">Acerca de Nosotros</h1>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-12">
          <h2 className="text-3xl font-semibold text-[#975F7C] mb-4">Nuestra Historia</h2>
          <div className="flex">
            <p className="text-gray-600 mb-4">
              Fundada en 2010, nuestra empresa ha estado a la vanguardia de la innovación tecnológica durante más de una década.
              Comenzamos con una visión simple: hacer que la tecnología sea accesible para todos. <br />
              Nuestro viaje ha estado marcado por hitos significativos, desde el lanzamiento de nuestro primer producto en 2012 hasta nuestra expansión internacional en 2018.
            </p>
            <img
              src={lamahistory}
              alt="llama Historiadora"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
          </div>

        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-12 flex ">
          <div className="">
            <h2 className="text-3xl font-semibold text-[#975F7C] mb-4">Nuestra Misión</h2>

            <p className="text-gray-600 mb-4">
              Nuestra misión es proporcionar soluciones tecnológicas innovadoras que mejoren la vida cotidiana de las personas y las empresas.
              Nos esforzamos por crear productos que sean intuitivos, eficientes y sostenibles.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Innovación constante en nuestros productos y servicios</li>
              <li>Compromiso con la satisfacción del cliente</li>
              <li>Fomento de un ambiente de trabajo colaborativo y diverso</li>
              <li>Responsabilidad social y ambiental en todas nuestras operaciones</li>
            </ul>
          </div>
          <img
            src={lamamission}
            alt="llama en mision"
            className="rounded-full mx-auto mb-4"
          />
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-12">
          <h2 className="text-3xl font-semibold text-[#975F7C] mb-4">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FBE9F1] p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-[#975F7C] mb-2">Innovación</h3>
              <p className="text-gray-600">Buscamos constantemente nuevas formas de mejorar y revolucionar la tecnología.</p>
            </div>
            <div className="bg-[#FBE9F1] p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-[#975F7C] mb-2">Integridad</h3>
              <p className="text-gray-600">Actuamos con honestidad y ética en todas nuestras interacciones y decisiones.</p>
            </div>
            <div className="bg-[#FBE9F1] p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-[#975F7C] mb-2">Colaboración</h3>
              <p className="text-gray-600">Fomentamos un ambiente de trabajo en equipo y apoyo mutuo.</p>
            </div>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-12">
          <h2 className="text-3xl font-semibold text-[#975F7C] mb-6">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-[#FBE9F1] p-6 rounded-lg text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-[#975F7C]">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
