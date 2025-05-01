
import React, { useState, useEffect } from 'react';
import { Image } from 'lucide-react';

interface ImageQuestionProps {
  imageUrl?: string;
  altText?: string;
}

const ImageQuestion: React.FC<ImageQuestionProps> = ({ imageUrl, altText }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setLoading(false);
      return;
    }

    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => setLoading(false);
    img.onerror = () => {
      setLoading(false);
      setError(true);
    };
  }, [imageUrl]);

  if (!imageUrl) return null;

  return (
    <div className="w-full my-4 flex justify-center">
      {loading && (
        <div className="w-full max-w-md h-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse flex items-center justify-center">
          <Image className="h-10 w-10 text-gray-400 dark:text-gray-500" />
        </div>
      )}
      
      {!loading && error && (
        <div className="w-full max-w-md h-48 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Image could not be loaded</p>
        </div>
      )}
      
      {!loading && !error && (
        <img 
          src={imageUrl} 
          alt={altText || "Question image"} 
          className="max-w-md max-h-60 object-contain rounded-md shadow-md animate-fade-in" 
        />
      )}
    </div>
  );
};

export default ImageQuestion;
