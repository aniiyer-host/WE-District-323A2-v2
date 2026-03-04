import { createContext, useContext, useState } from 'react';

const GalleryContext = createContext();

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};

export const GalleryProvider = ({ children }) => {
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  return (
    <GalleryContext.Provider value={{ isGalleryOpen, setGalleryOpen }}>
      {children}
    </GalleryContext.Provider>
  );
};
