import React, { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import appFirebase from '../../../Firebase/config';

const db = getFirestore(appFirebase)
function FeaturedAds() {
  const [currentImage, setCurrentImage] = useState(0);
  const [promotionalImages, setpromotionalImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const fetchedProviders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setpromotionalImages(fetchedProviders);
        console.log(promotionalImages.length)
        if (promotionalImages.length > 0) {
          const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % promotionalImages.length);
          }, 5000);
          console.log(currentImage)

          return () => clearInterval(timer);
        }

      } catch (error) {
        console.error('Error fetching providers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();

  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }


  return (
    <div className="bg-gray-100 rounded-xl overflow-hidden">
      <div className="relative aspect-[21/9]">
        <img
          src={promotionalImages[currentImage]?.imageUrl || ''}
          alt={promotionalImages[currentImage]?.name_product || ''}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
          <h2 className="text-2xl font-semibold text-white mb-2">
            {promotionalImages[currentImage]?.name_product || ''}
          </h2>
          <p className="text-gray-200">
            Descubre nuestras mejores ofertas y productos exclusivos
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeaturedAds;
