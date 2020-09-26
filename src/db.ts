import levelup, { LevelUp } from 'levelup';
import rocksdb from 'rocksdb';

let db: LevelUp<rocksdb>;

const initDB = (): void => {
  db = levelup(rocksdb('./mydb'));
};

export { initDB, db };
