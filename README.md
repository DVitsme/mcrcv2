# How to start this thing

Daily Development Workflow

## Start the Database:

Open your terminal in the project root and run:

> > docker compose up -d

(This starts your PostgreSQL container in the background. You only need to do this once per work session.)

## Reset & Seed (When Needed):

> > pnpm payload migrate:fresh
> > pnpm run seed

## Start the Dev Server:

> > pnpm dev

Your application is now running completely locally, using zero Neon compute hours.

## Stop the Database:

When you are done for the day, stop the container:

> > docker compose down

## Production Update Workflow

When you have hit a benchmark and are ready to update the live site:

Generate Migration Files: As you develop, create migration files for your schema changes:

> > pnpm payload migrate:create <descriptive_name>

Apply Migrations to Production: Run the migrate command and force it to use your production environment variables. This safely updates the schema of your Neon database without deleting any data.

> > cross-env NODE_ENV=production pnpm payload migrate
