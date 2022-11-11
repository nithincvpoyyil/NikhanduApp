import {GroupByDictWord, OlamDBItem} from './DBHelper';

function groupByPartOfSpeech(list: OlamDBItem[]) {
  let groupedByPOfS = new Map<string, Array<OlamDBItem>>();
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const {part_of_speech = 'unknown'} = item;
    if (!groupedByPOfS.has(part_of_speech)) {
      groupedByPOfS.set(part_of_speech, [item]);
    } else {
      let oldArray = groupedByPOfS.get(part_of_speech) || [];
      let newArray = [...oldArray, item];
      groupedByPOfS.set(part_of_speech, newArray);
    }
  }
  return groupedByPOfS;
}

export function groupByEnglishWord(list: OlamDBItem[]): GroupByDictWord {
  let formattedList: GroupByDictWord = {
    enList: new Set<string>(),
    enMap: new Map(),
  };

  // group to single english word
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    const {english_word} = item;

    if (!formattedList.enList.has(english_word)) {
      formattedList.enList.add(english_word);
    }

    if (!formattedList.enMap.has(english_word)) {
      formattedList.enMap.set(english_word, [item]);
    } else {
      let oldArray: OlamDBItem[] = formattedList.enMap.get(english_word) || [];
      let newArray: OlamDBItem[] = [...oldArray, item];
      formattedList.enMap.set(english_word, newArray);
    }
  }

  // group by part of speech from map
  let newMap = new Map<string, Map<string, OlamDBItem[]>>();
  for (let [key, value] of formattedList.enMap) {
    let groupedByPOfSMap = groupByPartOfSpeech(value);
    newMap.set(key, groupedByPOfSMap);
  }
  formattedList.enMap = newMap;
  return formattedList;
}
