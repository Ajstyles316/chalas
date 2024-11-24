import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { algoliasearch } from 'algoliasearch';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch';

const APPLICATION_ID = 'DSW1VSW9MM';
const SEARCH_API_KEY = 'f23cb9d50b6a40127c3a77ee34d81775';
const ALGOLIA_INDEX = 'products';

const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
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
//const index = client.initIndex(ALGOLIA_INDEX);

function Hit({ hit }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 border rounded-lg p-3 hover:shadow-md transition bg-yellow-50">
        <img
          src={hit.imageUrl}
          alt={hit.name_product}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-bold text-orange-600">{hit.name_product}</h3>
          <p className="text-sm text-orange-500">{hit.description}</p>
        </div>
      </div>
    </div>
  );
}
export default function AISearch() {
  /*
  const [results, setResults] = useState(null)
  const performSearch = async (value) => {
    const { hits } = await index.search(value, {
      hitsPerPage: 5
    })

    const results = hits.map(hit => {
      const { objectID: key, href, _highlightResult } = hit
      const { title: { value: title } } = _highlightResult
      return { key, href, title }
    })

    setResults(results)
  }

  const handleChange = (e) => {
    const { value } = e.target

    value === ''
      ? setResults(null)
      : performSearch(value)
  }
  */
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-black">Búsqueda Inteligente</h2>
        <Sparkles className="h-5 w-5 text-orange-500 ml-2" />
      </div>
      <div>
        <InstantSearch
          searchClient={searchClient}
          indexName={ALGOLIA_INDEX}
        >
          <SearchBox
            placeholder="Describe el evento que buscas..."
            classNames={{
              input: "w-full px-5 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-300",
              submitIcon: "h-8 w-8 absolute right-2 top-2 bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition",
              resetIcon: "h-8 w-8 absolute right-2 top-2 bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition",
              loadingIcon: "h-8 w-8 absolute right-2 top-2 bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition",

            }}
          />
          <Hits
            hitComponent={Hit}
          />
        </InstantSearch>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">Sugerencias populares:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Bodas", "Corporativos", "Cumpleaños", "Conferencias"].map((tag) => (
            <span key={tag} className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm cursor-pointer hover:bg-yellow-100 transition">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
