const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/leads', async (req, res) => {
  const { name, email, company, message } = req.body;

  console.log(name, email);
  
  if (!name || !email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid input.' });
  }

  try {
    // Replace with your n8n webhook URL
    const response = await fetch('https://lohith.app.n8n.cloud/webhook/new-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, company, message }),
    });

    if (!response.ok) throw new Error('Failed to send to n8n');

    res.status(200).json({ message: 'Lead submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
