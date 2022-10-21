import Realm from 'realm';
import {OlamDBItem, OlamDBSchema} from './OlamDB.model';

async function quickStart() {
  const realm = await Realm.open({
    path: 'OlamDB.realm',
    schema: [OlamDBSchema],
  });

  const olamDbItems = realm.objects('OlamDB');
  let abc = olamDbItems.entries();

  for (let i = 0; i < 10; i++) {
    console.log(abc.next());
  }

  // Remember to close the realm
  realm.close();
}

export function dao() {
  quickStart().catch(error => {
    console.log(`An error occurred: ${error}`);
  });
}
