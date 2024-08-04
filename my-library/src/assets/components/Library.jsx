import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import '../../styles/Library.css';

const Library = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.post(`/api/v1/databases/${import.meta.env.VITE_NOTION_DATABASE_ID}/query`, {}, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28'
          }
        });
        setBooks(response.data.results);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="library-container">
      <div className="books-grid">
        {books.map(book => (
          <AnimatedBookCard key={book.id} book={book} onClick={() => handleBookClick(book.id)} />
        ))}
      </div>
    </div>
  );
};

const AnimatedBookCard = ({ book, onClick }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 220, friction: 120 }
  });

  const portada = book.properties.Portada?.files?.[0]?.external?.url || book.properties.Portada?.files?.[0]?.file?.url || 'default-image-url';
  const titulo = book.properties.Título?.title?.[0]?.text?.content || 'Título desconocido';

  return (
    <animated.div style={props} className="book-card" onClick={onClick}>
      <img src={portada} alt={titulo} />
    </animated.div>
  );
};

export default Library;
