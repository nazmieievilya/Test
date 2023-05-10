import axios from "axios";

export function postRecord(id, date, isEditing, value) {
  axios
    .post(`https://quintadb.com/apps/asDxODiSjlWPddImkYiuzr/dtypes.json`, {
      rest_api_key: "dcOmkFW6TdP74bWQBdRSoU",
      values: {
        entity_id: "dcMdJcPKDmt6DUW5_cU8oT",
        bYgKBcOmnizzjlksqqWO0i: id,
        c4CmolbJ5dQOo_W5JcIMO1: date,
        ddNmkvj8jodykfW6tdN8os: isEditing,
        c0kmkwWOHlWPldO8kcW6a5: value,
      },
    })
    .then((r) => console.log(r.data))
    .catch((error) => {
      console.error(error);
    });
}
function getAllRecord() {
  return new Promise((res, rej) => {
    axios
      .get(
        "https://quintadb.com/apps/asDxODiSjlWPddImkYiuzr/dtypes/entity/dcMdJcPKDmt6DUW5_cU8oT.json?rest_api_key=dcOmkFW6TdP74bWQBdRSoU&amp;view="
      )
      .then((r) => res(r.data.records))
      .catch((e) => rej(e));
  });
}
export function deleteAllRec() {
  return new Promise((res, rej) => {
    axios
      .delete(
        "https://quintadb.com/dtypes/asDxODiSjlWPddImkYiuzr/delete_all/dcMdJcPKDmt6DUW5_cU8oT.json?rest_api_key=dcOmkFW6TdP74bWQBdRSoU&amp;view="
      )
      .then((r) => res(r))
      .catch((e) => rej(e));
  });
}
export async function getStucturedRecords() {
  const resp = await getAllRecord();
  const structured = resp.map((rec) => {
    const desres = rec.values;
    return {
      id: desres.bYgKBcOmnizzjlksqqWO0i,
      value: desres.c0kmkwWOHlWPldO8kcW6a5,
      isEditing: desres.ddNmkvj8jodykfW6tdN8os === "true" ? true : false,
      date: desres.c4CmolbJ5dQOo_W5JcIMO1,
    };
  });
  console.log(structured);
}

// indexedDB

const dbName = "myDatabase";
const dbVersion = 1;
const request = indexedDB.open(dbName, dbVersion);

// handle database upgrade
request.onupgradeneeded = function (event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore("myObjectStore", { keyPath: "id" });
  objectStore.createIndex("name", "name", { unique: false });
};

export function replaceObjectsInDB(newObjects) {
  const dbName = "myDatabase";
  const dbVersion = 1;
  const request = indexedDB.open(dbName, dbVersion);

  request.onsuccess = function (event) {
    const db = event.target.result;

    const transaction = db.transaction("myObjectStore", "readwrite");
    const objectStore = transaction.objectStore("myObjectStore");

    // Clear the object store
    const clearRequest = objectStore.clear();

    clearRequest.onsuccess = function (event) {
      // Add the new objects to the object store
      newObjects.forEach(function (newObject) {
        const addRequest = objectStore.add(newObject);

        addRequest.onerror = function (event) {
          console.error("Error adding object to database:", event.target.error);
        };
      });

      console.log("Objects replaced in database");
    };

    clearRequest.onerror = function (event) {
      console.error("Error clearing object store:", event.target.error);
    };
  };

  request.onerror = function (event) {
    console.error("Error opening database:", event.target.error);
  };
}

export function getAllDataFromDB() {
  return new Promise(function (resolve, reject) {
    const dbName = "myDatabase";
    const dbVersion = 1;
    const request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = function (event) {
      const db = event.target.result;

      const transaction = db.transaction("myObjectStore", "readonly");
      const objectStore = transaction.objectStore("myObjectStore");
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function (event) {
        const result = event.target.result;
        resolve(result);
      };

      getAllRequest.onerror = function (event) {
        reject(event.target.error);
      };
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export function addObjectToDB(object) {
  const dbName = "myDatabase";
  const dbVersion = 1;
  const request = indexedDB.open(dbName, dbVersion);

  request.onsuccess = function (event) {
    const db = event.target.result;

    const transaction = db.transaction("myObjectStore", "readwrite");
    const objectStore = transaction.objectStore("myObjectStore");
    const addRequest = objectStore.add(object);

    addRequest.onsuccess = function (event) {
      console.log("Object added to database:", object);
    };

    addRequest.onerror = function (event) {
      console.error("Error adding object to database:", event.target.error);
    };
  };

  request.onerror = function (event) {
    console.error("Error opening database:", event.target.error);
  };
}
