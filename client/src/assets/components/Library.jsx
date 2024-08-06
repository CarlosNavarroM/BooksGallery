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
        const response = await axios.get('/api/books');
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error('Unexpected response data format', response.data);
        }
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
        {books.map(book => (
          <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex align-items-stretch">
            <BookCard book={book} onClick={() => handleBookClick(book.id)} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const BookCard = ({ book, onClick }) => {
  const portada = book.properties.Portada?.files?.[0]?.external?.url || book.properties.Portada?.files?.[0]?.file?.url || 'default-image-url';
  const titulo = book.properties.Título?.title?.[0]?.text?.content || 'Titulo desconocido';

  return (
    <div className="book-card" onClick={onClick}>
      <img src={portada} alt={titulo} className="book-card-img" />
    </div>
  );
};

export default Library;
