const Realm = require('realm');
const path = require('path');

const TypeMap = {
  n: 'നാമം  :noun',
  v: 'ക്രിയ  :verb',
  a: 'വിശേഷണം  :adjective',
  adv: 'ക്രിയാവിശേഷണം  :adverb',
  pron: 'സര്‍വ്വനാമം  :pronoun',
  propn: 'സംജ്ഞാനാമം  :proper noun',
  phrv: 'ഉപവാക്യ ക്രിയ  :phrasal verb',
  conj: 'അവ്യയം  :conjunction',
  interj: 'വ്യാക്ഷേപകം  :interjection',
  prep: 'ഉപസര്‍ഗം  :preposition',
  pfx: 'പൂർവ്വപ്രത്യയം  :prefix',
  sfx: 'പ്രത്യയം  :suffix',
  idm: 'ഭാഷാശൈലി  :idiom',
  abbr: 'സംക്ഷേപം  :abbreviation',
  auxv: 'പൂരകകൃതി  :auxiliary verb',
};

const {stem} = require('../app/stemmer/PorterStemmer');

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
    let result = dict.filtered("english_word == 'Cat'");
    console.log(result.length, realm.isClosed, realm.isEmpty);
    console.log(result.map(i => ({id: i._id, name: i.malayalam_definition})));
    realm.close();
  } catch (error) {
    console.error(error);
  }
}

async function getSuggestions(query) {
  try {
    const realm = await Realm.open({
      path: path.join(__dirname, './olam1.realm'),
      schema: [OlamDBSchema],
      schemaVersion: 5,
    });

    let stemWord = stem(query);
    let dict = realm.objects('OLAM_DB');
    let resultExact = dict.filtered(
      'english_word LIKE[c] $0 || english_word LIKE[c] $1 LIMIT(30)',
      query,
      `*${stemWord}*`,
    );
    console.log(resultExact.map(i => ({en: i.english_word})));
    realm.close();
  } catch (error) {
    console.error(error);
  }
}

async function getWordFromDict(keyword) {
  try {
    const realm = await Realm.open({
      path: path.join(__dirname, './olam1.realm'),
      schema: [OlamDBSchema],
      schemaVersion: 5,
    });


    let dict = realm.objects('OLAM_DB');

    let exact = dict.filtered('english_word ==[c] $0 LIMIT(10)', keyword);

    //  let stemWord = stem(keyword);
    // let similar = dict.filtered(
    //   'english_word LIKE[c] $0 || english_word LIKE[c] $1 LIMIT(30)',
    //   keyword,
    //   `*${stemWord}*`,
    // );
    console.log(exact.map(i => ({en: i.english_word})));

    realm.close();
  } catch (error) {
    console.error(error);
  }
}
