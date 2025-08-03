import * as migration_20250629_044842_add_form_builder from './20250629_044842_add_form_builder';
import * as migration_20250630_132557_enable_event_slug_query from './20250630_132557_enable_event_slug_query';
import * as migration_20250630_201755_update_events_isFree from './20250630_201755_update_events_isFree';
import * as migration_20250630_204942_updated_events_collection from './20250630_204942_updated_events_collection';

export const migrations = [
  {
    up: migration_20250629_044842_add_form_builder.up,
    down: migration_20250629_044842_add_form_builder.down,
    name: '20250629_044842_add_form_builder',
  },
  {
    up: migration_20250630_132557_enable_event_slug_query.up,
    down: migration_20250630_132557_enable_event_slug_query.down,
    name: '20250630_132557_enable_event_slug_query',
  },
  {
    up: migration_20250630_201755_update_events_isFree.up,
    down: migration_20250630_201755_update_events_isFree.down,
    name: '20250630_201755_update_events_isFree',
  },
  {
    up: migration_20250630_204942_updated_events_collection.up,
    down: migration_20250630_204942_updated_events_collection.down,
    name: '20250630_204942_updated_events_collection'
  },
];
