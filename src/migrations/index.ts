import * as migration_20250603_165653_create_initial_schema from './20250603_165653_create_initial_schema';

export const migrations = [
  {
    up: migration_20250603_165653_create_initial_schema.up,
    down: migration_20250603_165653_create_initial_schema.down,
    name: '20250603_165653_create_initial_schema'
  },
];
