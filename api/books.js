import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/books', async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
        },
      }
    );
    res.status(200).json(response.data.results);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Error fetching books' });
  }
});

app.get('/api/book/:id', async (req, res) => {  // Asegúrate de que la ruta sea "/api/book/:id"
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.notion.com/v1/pages/${id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ error: 'Error fetching book details' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
