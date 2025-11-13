import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  access: {
    secret: process.env.JWT_ACCESS_SECRET || 'access-secret',
    expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m',
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
  },
}));
