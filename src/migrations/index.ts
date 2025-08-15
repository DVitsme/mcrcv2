import * as migration_20250813_221306_baseline_blog_schema from './20250813_221306_baseline_blog_schema';

export const migrations = [
  {
    up: migration_20250813_221306_baseline_blog_schema.up,
    down: migration_20250813_221306_baseline_blog_schema.down,
    name: '20250813_221306_baseline_blog_schema'
  },
];
