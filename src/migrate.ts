import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './db';
import { tryit } from 'radash';

(async () => {
  const [err] = await tryit(
    async () =>
      await migrate(db, {
        migrationsFolder: './supabase/migrations',
        migrationsSchema: 'public',
      }),
  )();

  if (err) {
    console.log('[Migrator][Error]: Cause ', err.stack);
    process.exit(1);
  }

  console.log('[Migrator][Success]: Migrate Successfully!');
  process.exit(0);
})();
