import * as migration_20250603_165653_create_initial_schema from './20250603_165653_create_initial_schema';
import * as migration_20250608_154514_add_user_name_field from './20250608_154514_add_user_name_field';

export const migrations = [
  {
    up: migration_20250603_165653_create_initial_schema.up,
    down: migration_20250603_165653_create_initial_schema.down,
    name: '20250603_165653_create_initial_schema',
  },
  {
    up: migration_20250608_154514_add_user_name_field.up,
    down: migration_20250608_154514_add_user_name_field.down,
    name: '20250608_154514_add_user_name_field'
  },
];
