
// IndexedDB utility functions
const DB_NAME = 'portfolioDB';
const DB_VERSION = 1;
const STORES = [
  'skills', 
  'experiences', 
  'education', 
  'projects', 
  'testimonials', 
  'blogPosts', 
  'stats', 
  'brands'
];

// Initialize the database
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => {
      console.error('IndexedDB error:', event);
      reject('Error opening IndexedDB');
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object stores for each data type
      STORES.forEach(storeName => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      });
    };
  });
};

// Get all items from a store
export const getAllItems = async <T>(storeName: string): Promise<T[]> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    
    request.onsuccess = () => {
      resolve(request.result);
    };
    
    request.onerror = (event) => {
      console.error(`Error getting items from ${storeName}:`, event);
      reject(`Error getting items from ${storeName}`);
    };
  });
};

// Add an item to a store
export const addItem = async <T extends { id: string }>(storeName: string, item: T): Promise<T> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.add(item);
    
    request.onsuccess = () => {
      resolve(item);
    };
    
    request.onerror = (event) => {
      console.error(`Error adding item to ${storeName}:`, event);
      reject(`Error adding item to ${storeName}`);
    };
  });
};

// Update an item in a store
export const updateItem = async <T extends { id: string }>(storeName: string, item: T): Promise<T> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(item);
    
    request.onsuccess = () => {
      resolve(item);
    };
    
    request.onerror = (event) => {
      console.error(`Error updating item in ${storeName}:`, event);
      reject(`Error updating item in ${storeName}`);
    };
  });
};

// Delete an item from a store
export const deleteItem = async (storeName: string, id: string): Promise<void> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);
    
    request.onsuccess = () => {
      resolve();
    };
    
    request.onerror = (event) => {
      console.error(`Error deleting item from ${storeName}:`, event);
      reject(`Error deleting item from ${storeName}`);
    };
  });
};

// Clear a store and add default data
export const resetStore = async <T extends { id: string }>(storeName: string, defaultData: T[]): Promise<T[]> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const clearRequest = store.clear();
    
    clearRequest.onsuccess = async () => {
      try {
        for (const item of defaultData) {
          await addItem(storeName, item);
        }
        resolve(defaultData);
      } catch (error) {
        reject(error);
      }
    };
    
    clearRequest.onerror = (event) => {
      console.error(`Error clearing store ${storeName}:`, event);
      reject(`Error clearing store ${storeName}`);
    };
  });
};
