const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await axios.get(`https://api.notion.com/v1/pages/${id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ error: 'Error fetching book details' });
  }
};
