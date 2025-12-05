import { defineConfig } from '@prisma/config';
import { PrismaPostgres } from '@prisma/adapter-postgresql';

export default defineConfig({
  client: {
    adapter: new PrismaPostgres(process.env.DATABASE_URL!),
  },
});
