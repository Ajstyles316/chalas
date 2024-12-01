import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ProductGallery from './components/ProductGallery';
import { algoliasearch } from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch';
import FeaturedAds from './components/FeaturedAds';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import lamaLogo from '../../assets/img/llama_stupid.png'

const APPLICATION_ID = 'DSW1VSW9MM';
const SEARCH_API_KEY = 'f23cb9d50b6a40127c3a77ee34d81775';
const ALGOLIA_INDEX = 'products';

const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);

/*
const searchClient = {
  ...client,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      // Here we have to do something else
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: '',
          params: '',
        })),
      });
    }
    return client.search(requests);
  },
};
*/

const searchClient = {
  ...client,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return client.search(
        requests.map((request) => ({
          ...request,
          params: {
            ...request.params,
            query: '',
            facets: ['*'], // Devuelve todas las facetas configuradas
            maxValuesPerFacet: 100, // Ajusta el límite si es necesario
          },
        }))
      );
    }
    return client.search(requests);
  },
};
const Client = () => {
  const [isMessageVisible, setMessageVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessageVisible(false);
    }, 9000); // El mensaje desaparece después de 5 segundos

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX}>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <FeaturedAds />
          <ProductGallery />
        </main>
        <Footer />
        <Chatbot />
        {isMessageVisible && (
          <div className="fixed bottom-4 right-4">
            <div className="relative w-32 h-32">
              <img
                src={lamaLogo}
                alt="Llama Chatbot"
                className="w-full h-full object-contain rounded-full shadow-lg"
              />
              <div className="absolute bottom-32 left-0 transform -translate-x-1/2 w-36 bg-gray-900 text-white p-2 rounded-lg shadow-md">
                <p>¡Hola! Soy tu asistente virtual</p>
              </div>
            </div>
          </div>
        )}
      </InstantSearch>
    </div>
  );
};

export default Client;

