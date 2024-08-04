import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.post(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, {}, {
      headers: {
        'Authorization': `Bearer ${process.env.VITE_NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28'
      }
    });

    res.status(200).json(response.data.results);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Error fetching books' });
  }
}
