import Realm from 'realm';
import stem from '../stemmer/PorterStemmer';
import {groupByEnglishWord} from './formatter';
export type OlamDBItem = {
  _id: number;
  english_word: string;
  part_of_speech?: string;
  malayalam_definition: string;
};

export type GroupByDictWord = {
  enList: Set<string>;
  enMap: Map<string, any>;
};

export const typeMap = new Map([
  ['n', 'നാമം (noun)'],
  ['v', 'ക്രിയ  (verb)'],
  ['a', 'വിശേഷണം (adjective)'],
  ['adv', 'ക്രിയാവിശേഷണം (adverb)'],
  ['pron', 'സര്‍വ്വനാമം (pronoun)'],
  ['propn', 'സംജ്ഞാനാമം (proper noun)'],
  ['phrv', 'ഉപവാക്യ ക്രിയ (phrasal verb)'],
  ['conj', 'അവ്യയം (conjunction)'],
  ['interj', 'വ്യാക്ഷേപകം (interjection)'],
  ['prep', 'ഉപസര്‍ഗം (preposition)'],
  ['pfx', 'പൂർവ്വപ്രത്യയം (prefix)'],
  ['sfx', 'പ്രത്യയം (suffix)'],
  ['idm', 'ഭാഷാശൈലി (idiom)'],
  ['abbr', 'സംക്ഷേപം (abbreviation)'],
  ['auxv', 'പൂരകകൃതി (auxiliary verb)'],
  ['unknown', 'ശബ്‌ദഭേദം ഉൾപ്പെടുത്തിയിട്ടില്ല (part of speech undefined)'],
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

export const getEmptyDictGrouped = (): GroupByDictWord => ({
  enList: new Set(),
  enMap: new Map(),
});

const mapperFunction = (resultItem: OlamDBItem & Realm.Object<unknown>) => {
  const {_id, english_word, malayalam_definition, part_of_speech} = resultItem;
  const item: OlamDBItem = {
    _id,
    english_word,
    malayalam_definition,
    part_of_speech,
  };
  return item;
};

let bundlePath = 'olamDBNew.realm';

export async function getResultsFromDB(
  queryString: string,
): Promise<{exactResults: GroupByDictWord; similarResults: GroupByDictWord}> {
  let dbCheck = false;

  try {
    Realm.copyBundledRealmFiles();
    dbCheck = Realm.exists({
      path: bundlePath,
      schema: [OlamDBSchema],
      schemaVersion: 5,
    });
  } catch (error) {
    return {
      exactResults: {enList: new Set(), enMap: new Map()},
      similarResults: {enList: new Set(), enMap: new Map()},
    };
  }

  let similarResults: Array<OlamDBItem> = [];
  let exactWordResults: Array<OlamDBItem> = [];

  try {
    if (!dbCheck) {
      throw new Error();
    }
    let rdb = await Realm.open({
      path: bundlePath,
      schema: [OlamDBSchema],
      schemaVersion: 5,
    });
    let query = (queryString || '').trim().toLowerCase();
    let stemWord = stem(query);
    let olamDB = rdb.objects<OlamDBItem>('OLAM_DB');

    exactWordResults = olamDB
      .filtered('english_word ==[c] $0 LIMIT(30)', query)
      .map(mapperFunction);

    similarResults = olamDB
      .filtered(
        'english_word LIKE[c] $0 && english_word !=[c] $1 LIMIT(25)',
        `*${stemWord}*`,
        query,
      )
      .map(mapperFunction);
    rdb.close();
    let exactResultsGrouped = groupByEnglishWord(exactWordResults);
    let similarResultsGrouped = groupByEnglishWord(similarResults);
    // delay code
    // await new Promise(res => {
    //   setTimeout(() => {
    //     res(true);
    //   }, 4000);
    // });

    return {
      exactResults: exactResultsGrouped,
      similarResults: similarResultsGrouped,
    };
  } catch (e) {}
  return {
    exactResults: {enList: new Set(), enMap: new Map()},
    similarResults: {enList: new Set(), enMap: new Map()},
  };
}

export async function getSuggestions(
  queryString: string,
): Promise<Set<string>> {
  let dbCheck = false;

  try {
    Realm.copyBundledRealmFiles();
    dbCheck = Realm.exists({
      path: bundlePath,
      schema: [OlamDBSchema],
      schemaVersion: 5,
    });
  } catch (error) {
    return new Set();
  }

  let similarResults: Array<OlamDBItem> = [];

  try {
    if (!dbCheck) {
      throw new Error();
    }
    let rdb = await Realm.open({
      path: bundlePath,
      schema: [OlamDBSchema],
      schemaVersion: 5,
    });
    let query = (queryString || '').trim().toLowerCase();
    let stemWord = stem(query);
    let olamDB = rdb.objects<OlamDBItem>('OLAM_DB');

    similarResults = olamDB
      .filtered(
        'english_word LIKE[c] $0 || english_word ==[c] $1 LIMIT(20)',
        `*${stemWord}*`,
        query,
      )
      .map(mapperFunction);
    rdb.close();

    let set = new Set<string>();
    for (let i = 0; i < similarResults.length; i++) {
      let enWord = similarResults[i].english_word;
      if (!set.has(enWord)) {
        set.add(enWord);
      }
    }
    return set;
  } catch (e) {}
  return new Set<string>();
}

export async function healthCheck(): Promise<any> {
  let dbCheck = false;
  try {
    Realm.copyBundledRealmFiles();
    dbCheck = Realm.exists({
      path: bundlePath,
      schema: [OlamDBSchema],
      schemaVersion: 5,
    });
  } catch (error) {
    return {
      dbCheck: false,
      bundlePath,
      error: true,
    };
  }

  try {
    let rdb = await Realm.open({
      path: bundlePath,
      schema: [OlamDBSchema],
      schemaVersion: 5,
    });
    let query = 'cat';
    let stemWord = stem(query);
    let olamDB = rdb.objects<OlamDBItem>('OLAM_DB');

    let similarResults = olamDB
      .filtered(
        'english_word LIKE[c] $0 || english_word ==[c] $1 LIMIT(20)',
        `*${stemWord}*`,
        query,
      )
      .map(mapperFunction);
    rdb.close();
    const resultsCount = similarResults.length;

    return {
      bundlePath,
      dbCheck,
      resultsCount,
    };
  } catch (e) {
    return {
      bundlePath,
      error: true,
    };
  }
}
