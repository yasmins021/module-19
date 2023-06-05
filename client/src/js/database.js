import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => 
//console.error('putDb not implemented');
{
  console.log('POST to database');
  // create a connection to jate database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // create new transaction & specify database/permission
  const tx = jateDb.transaction('jate', 'readwrite');
  // open up the desired object store.
  const store = tx.objectStore('jate');
  const request = store.put({ 
    id: 1, 
    value: content 
  });
  const result = await request;
  console.log('data saved to the database', result);
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => 
//console.error('getDb not implemented');
{
  console.log('GET from db');
  // create a connection to database and specify ver.
  const jateDb = await openDB('jate', 1);
  // create a new transaction and specifys database/permission
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // get all data from db
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();