import * as migration_20250619_050227_final_clean_schema from './20250619_050227_final_clean_schema';

export const migrations = [
  {
    up: migration_20250619_050227_final_clean_schema.up,
    down: migration_20250619_050227_final_clean_schema.down,
    name: '20250619_050227_final_clean_schema'
  },
];
