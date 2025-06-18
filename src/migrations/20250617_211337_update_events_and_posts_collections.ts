import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP CONSTRAINT "posts_meta_image_id_media_id_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_posts_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_posts_fk";
  
  DROP INDEX IF EXISTS "posts_meta_meta_image_idx";
  DROP INDEX IF EXISTS "posts_rels_posts_id_idx";
  DROP INDEX IF EXISTS "_posts_v_version_meta_version_meta_image_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_posts_id_idx";
  ALTER TABLE "posts" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "posts" ADD COLUMN "read_time_minutes" numeric;
  ALTER TABLE "_posts_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_read_time_minutes" numeric;
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "posts_rels" DROP COLUMN IF EXISTS "posts_id";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_meta_image_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN IF EXISTS "posts_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "posts_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "posts_id" integer;
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "excerpt";
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "read_time_minutes";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_excerpt";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_read_time_minutes";`)
}
