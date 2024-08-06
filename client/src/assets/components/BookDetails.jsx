import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`-api.vercel.app/api/books${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const portada = book.properties.Portada?.files?.[0]?.external?.url || book.properties.Portada?.files?.[0]?.file?.url || 'default-image-url';
  const titulo = book.properties.Título?.title?.[0]?.text?.content || 'Título desconocido';
  const autor = book.properties.Autor?.rich_text?.[0]?.text?.content || 'Autor desconocido';
  const año = book.properties.Año?.rich_text?.[0]?.text?.content || 'Año desconocido';
  const opinion = book.properties.Opinion?.rich_text?.[0]?.text?.content || 'Sin opinión';
  const archivo = book.properties.Archivos?.files?.[0]?.file?.url || '#';

  return (
    <div className="book-details">
      <img src={portada} alt={titulo} className="book-cover" />
      <div className="book-info">
        <h2>{titulo}</h2>
        <h3>{autor}</h3>
        <p>{año}</p>
        <p>{opinion}</p>
        <a href={archivo} target="_blank" rel="noopener noreferrer">Ir al libro</a>
      </div>
    </div>
  );
};

export default BookDetails;
