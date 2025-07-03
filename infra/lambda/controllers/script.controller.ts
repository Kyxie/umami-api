import { Request, Response } from 'express';

export const serveScript = (req: Request, res: Response) => {
  const endpoint = process.env.TRACKING_ENDPOINT;
  const js = `(function fetchStats() {
    function getAttr(attr) {
      const script = document.currentScript || document.querySelector('script[src*="/script.js"]');
      return parseInt(script?.getAttribute(attr) || '0');
    }

    const initVisitors = getAttr('init-visitors');
    const initViews = getAttr('init-views');
    const endpoint = '${endpoint}/umami';

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const views = (data?.pageviews?.value || 0) + initViews;
        const visitors = (data?.visitors?.value || 0) + initVisitors;
        document.getElementById('pv-count').innerText = views;
        document.getElementById('uv-count').innerText = visitors;
        console.log(data?.visitors?.value);
      })
      .catch(e => {
        console.error('Failed to load stats', e);
        document.getElementById('pv-count').innerText = initViews;
        document.getElementById('uv-count').innerText = initVisitors;
      });
  })();`;

  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.send(js);
};
