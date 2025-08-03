import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ADD COLUMN "registration_deadline" timestamp(3) with time zone;
  CREATE INDEX IF NOT EXISTS "events_meta_meta_event_type_idx" ON "events" USING btree ("meta_event_type");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "events_meta_meta_event_type_idx";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "registration_deadline";`)
}
