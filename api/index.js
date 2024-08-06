const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors'); // Importar cors

// Cargar variables de entorno desde .env
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); 

const app = express();
const port = process.env.PORT || 3001;

// Habilitar CORS (puedes personalizar las opciones)
app.use(cors()); 

// Middleware para parsear JSON
app.use(express.json());

app.get('/api/books', async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {}, // Body vacío, ya que es una consulta
      {
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28' // o la versión que estés usando
        }
      }
    );
    res.json(response.data.results);
  } catch (error) {
    console.error('Error al obtener libros de Notion:', error.response ? error.response.data : error.message); // Mostrar el mensaje de error de Notion si está disponible
    res.status(500).json({ error: 'No se pudieron obtener los libros de Notion' });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.notion.com/v1/pages/${id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28' 
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener detalles del libro de Notion:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'No se pudieron obtener los detalles del libro de Notion' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

module.exports = app; 
