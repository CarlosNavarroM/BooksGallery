const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const response = await axios.post(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, {}, {
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28'
        }
      });
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Error fetching books' });
    }
  }
};
