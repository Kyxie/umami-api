import * as dotenv from 'dotenv';
import { config } from '../config/config';

dotenv.config();

export function buildUmamiUrl() {
  const umamiHost = config.umamiHost;
  const websiteId = process.env.UMAMI_WEBSITE_ID!;
  const startAt = new Date('2021-01-01').getTime();
  const endAt = Date.now();
  return `${umamiHost}/api/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`;
}

export function getAuthHeader() {
  const token = process.env.UMAMI_USER_TOKEN!;
  return { Authorization: `Bearer ${token}` };
}
