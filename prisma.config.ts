import path from 'path';
import dotenv from 'dotenv';
import { defineConfig } from '@prisma/config';

// Load .env.local first (which Next.js uses for local overrides / secrets)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
// Fall back to .env
dotenv.config();

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
