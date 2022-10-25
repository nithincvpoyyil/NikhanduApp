const Realm = require('realm');
const path = require('path');

const OlamDBSchema = {
  name: 'OLAM_DB',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    english_word: 'string',
    part_of_speech: 'string?',
    malayalam_definition: 'string',
  },
};

async function execute() {
  try {
    const realm = await Realm.open({
      path: path.join(__dirname, './olam1.realm'),
      schema: [OlamDBSchema],
      schemaVersion: 5,
    });

    let dict = realm.objects('OLAM_DB');
    let result = dict.filtered("english_word == 'Abduct'");
    console.log(result.length, realm.isClosed, realm.isEmpty);
    realm.close();
  } catch (error) {
    console.error(error);
  }
}

execute().then(() => {});
