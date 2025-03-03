// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_blue_shard.sql';
import m0001 from './0001_special_iron_fist.sql';
import m0002 from './0002_clean_boom_boom.sql';
import m0003 from './0003_wooden_franklin_storm.sql';
import m0004 from './0004_clear_cloak.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004
    }
  }
  