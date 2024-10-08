import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString!, { debug: true });

export const db = drizzle(client, { schema });
