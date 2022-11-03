import RNFS from 'react-native-fs';
import Realm from 'realm';
import stem from '../stemmer/PorterStemmer';
export type OlamDBItem = {
  _id: number;
  english_word: string;
  part_of_speech?: string;
  malayalam_definition: string;
};

export const typeMap = new Map([
  ['n', 'നാമം  :noun'],
  ['v', 'ക്രിയ  :verb'],
  ['a', 'വിശേഷണം  :adjective'],
  ['adv', 'ക്രിയാവിശേഷണം  :adverb'],
  ['pron', 'സര്‍വ്വനാമം  :pronoun'],
  ['propn', 'സംജ്ഞാനാമം  :proper noun'],
  ['phrv', 'ഉപവാക്യ ക്രിയ  :phrasal verb'],
  ['conj', 'അവ്യയം  :conjunction'],
  ['interj', 'വ്യാക്ഷേപകം  :interjection'],
  ['prep', 'ഉപസര്‍ഗം  :preposition'],
  ['pfx', 'പൂർവ്വപ്രത്യയം  :prefix'],
  ['sfx', 'പ്രത്യയം  :suffix'],
  ['idm', 'ഭാഷാശൈലി  :idiom'],
  ['abbr', 'സംക്ഷേപം  :abbreviation'],
  ['auxv', 'പൂരകകൃതി  :auxiliary verb'],
  ['unknow', ''],
]);

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

export async function dbPathExists(q: string): Promise<Array<OlamDBItem>> {
  Realm.copyBundledRealmFiles();

  let bundlePath = RNFS.MainBundlePath + '/olamDBNew.realm';
  const check1 = await RNFS.exists(bundlePath);

  let check2 = Realm.exists({
    path: bundlePath,
    schema: [OlamDBSchema],
    schemaVersion: 5,
  });

  let resultExact: Array<OlamDBItem> = [];

  try {
    if (!check1 || !check2) {
      throw new Error();
    }
    let rdb = await Realm.open({
      path: bundlePath,
      schema: [OlamDBSchema],
      schemaVersion: 5,
    });
    let stemWord = q;
    resultExact = rdb
      .objects<OlamDBItem>('OLAM_DB')
      .filtered('english_word LIKE[c] $0 LIMIT(30)', stemWord, `*${stemWord}*`)
      .map(i => ({
        english_word: i.english_word,
        malayalam_definition: i.malayalam_definition,
        part_of_speech: i.part_of_speech,
        _id: i._id,
      })) as unknown as OlamDBItem[];
    rdb.close();
    return resultExact;
  } catch (e) {
    if (e instanceof Error) {
      let error = e as Error;
      console.log(' | message:', error.message, ' | name:', e.name);
    }
  }
  return [];
}
export async function getRealmInstance(): Promise<Realm> {
  let mainbundelPath = RNFS.MainBundlePath + '/olam1.realm';

  return new Promise<Realm>(async (resolve, rejects) => {
    // console.log(mainbundelPath);
    try {
      const realm = await Realm.open({
        path: mainbundelPath,
        schema: [OlamDBSchema],
        schemaVersion: 5,
      });
      console.log(mainbundelPath);
      resolve(realm);
    } catch (error) {
      rejects(error);
    }
  });
}
