// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
        messages: [{ role: 'user', content: userMessage }],
        temperature: 0.7,
        max_tokens: 512,
      },
      {
        headers: {
          Authorization: `Bearer ${TOGETHER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const assistantMessage = response.data.choices[0].message.content;
    res.json({ reply: assistantMessage });
  } catch (error) {
    console.error('Together AI error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get a response from Together AI' });
  }
});

app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
