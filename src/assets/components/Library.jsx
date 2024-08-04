import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/Library.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Library = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.post(`/api/databases/${import.meta.env.VITE_NOTION_DATABASE_ID}/query`, {});
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
    <Container className="library-container">
      <Row>
        {books && books.length > 0 ? (
          books.map(book => (
            <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex align-items-stretch">
              <BookCard book={book} onClick={() => handleBookClick(book.id)} />
            </Col>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </Row>
    </Container>
  );
};

const BookCard = ({ book, onClick }) => {
  const portada = book.properties.Portada?.url || 'default-image-url';
  const titulo = book.properties['Aa Título']?.title?.[0]?.text?.content || 'Título desconocido';

  return (
    <div className="book-card" onClick={onClick}>
      <img src={portada} alt={titulo} className="book-card-img" />
    </div>
  );
};

export default Library;
