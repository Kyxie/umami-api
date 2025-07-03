import { Request, Response } from 'express';
import axios from 'axios';
import { buildUmamiUrl, getAuthHeader } from '../utils/umami';

export async function getUmamiStats(req: Request, res: Response) {
  try {
    const url = buildUmamiUrl();
    const headers = getAuthHeader();
    const response = await axios.get(url, { headers });
    res.json(response.data);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
