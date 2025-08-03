import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events_blocks_image_block" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "events_blocks_image_block" ADD COLUMN "caption" varchar;
  ALTER TABLE "events" DROP COLUMN IF EXISTS "is_free";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "cost_amount";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "cost_currency";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "cost_description";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "is_registration_required";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "external_registration_link";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "registration_deadline";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events_blocks_image_block" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "events" ADD COLUMN "is_free" boolean DEFAULT true;
  ALTER TABLE "events" ADD COLUMN "cost_amount" numeric;
  ALTER TABLE "events" ADD COLUMN "cost_currency" varchar DEFAULT 'USD';
  ALTER TABLE "events" ADD COLUMN "cost_description" varchar;
  ALTER TABLE "events" ADD COLUMN "is_registration_required" boolean DEFAULT true;
  ALTER TABLE "events" ADD COLUMN "external_registration_link" varchar;
  ALTER TABLE "events" ADD COLUMN "registration_deadline" timestamp(3) with time zone;
  ALTER TABLE "events_blocks_image_block" DROP COLUMN IF EXISTS "caption";`)
}
