import * as migration_20250629_044842_add_form_builder from './20250629_044842_add_form_builder';

export const migrations = [
  {
    up: migration_20250629_044842_add_form_builder.up,
    down: migration_20250629_044842_add_form_builder.down,
    name: '20250629_044842_add_form_builder'
  },
];
