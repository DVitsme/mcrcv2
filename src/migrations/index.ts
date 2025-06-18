import * as migration_20250608_173619_initial_schema from './20250608_173619_initial_schema';
import * as migration_20250617_211337_update_events_and_posts_collections from './20250617_211337_update_events_and_posts_collections';

export const migrations = [
  {
    up: migration_20250608_173619_initial_schema.up,
    down: migration_20250608_173619_initial_schema.down,
    name: '20250608_173619_initial_schema',
  },
  {
    up: migration_20250617_211337_update_events_and_posts_collections.up,
    down: migration_20250617_211337_update_events_and_posts_collections.down,
    name: '20250617_211337_update_events_and_posts_collections'
  },
];
