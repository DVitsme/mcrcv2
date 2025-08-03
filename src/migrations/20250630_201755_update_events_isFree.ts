import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" ADD COLUMN "is_free" boolean DEFAULT true;
  ALTER TABLE "events" ADD COLUMN "cost_amount" numeric;
  ALTER TABLE "events" ADD COLUMN "cost_currency" varchar DEFAULT 'USD';
  ALTER TABLE "events" ADD COLUMN "cost_description" varchar;
  ALTER TABLE "events" ADD COLUMN "is_registration_required" boolean DEFAULT true;
  ALTER TABLE "events" ADD COLUMN "external_registration_link" varchar;
  CREATE INDEX IF NOT EXISTS "events_meta_meta_status_idx" ON "events" USING btree ("meta_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "events_meta_meta_status_idx";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "is_free";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "cost_amount";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "cost_currency";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "cost_description";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "is_registration_required";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "external_registration_link";`)
}
