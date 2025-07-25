import express from 'express';
const router = express.Router();

const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
const UMAMI_URL = process.env.UMAMI_URL;
const UMAMI_TOKEN = process.env.UMAMI_TOKEN;

router.get('/proxy', async (req, res) => {
  const { startAt, endAt } = req.query;
  const url = `${UMAMI_URL}/api/websites/${WEBSITE_ID}/stats/?startAt=${startAt}&endAt=${endAt}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${UMAMI_TOKEN}`,
        'User-Agent': 'umami-proxy/1.0',
        Accept: 'application/json',
      },
    });

    const contentType = response.headers.get('content-type') || '';
    const raw = await response.text();

    if (!response.ok || !contentType.includes('application/json')) {
      return res.status(500).json({ error: 'Invalid response from Umami' });
    }

    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    console.error('Proxy fetch error:', err);
    res.status(500).json({ error: 'proxy failed' });
  }
});

export default router;
