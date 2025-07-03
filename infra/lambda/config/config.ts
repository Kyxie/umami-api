export const config = {
  umamiHost: 'https://data.kyxie.me',
  allowedReferers: ['https://kyxie.me', 'https://www.kyxie.me'],
  rateLimit: {
    windowMs: 60 * 1000, // 1 min
    max: 20, // max 20 reqs in 1 min
  },
};
