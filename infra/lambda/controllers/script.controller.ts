import { Request, Response } from 'express';

export const serveScript = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.send(`
    (async function fetchStats() {
      const endpoint = location.origin + '/umami';
      try {
        const res = await fetch(endpoint);
        const data = await res.json();

        document.getElementById('pv-count').innerText = data?.pageviews?.value ?? '0';
        document.getElementById('uv-count').innerText = data?.visitors?.value ?? '0';
      } catch (e) {
        console.error('Failed to load stats', e);
      }
    })();
  `);
};
