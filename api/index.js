const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.get('/api/books', async (req, res) => {
  try {
    const response = await axios.post(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, {}, {
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28'
      }
    });
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching books from Notion:', error);
    res.status(500).json({ error: 'Failed to fetch books from Notion' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
