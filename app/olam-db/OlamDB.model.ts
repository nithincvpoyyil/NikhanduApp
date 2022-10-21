export type OlamDBItem = {
  id: number;
  englishword?: string;
  partofspeech?: string;
  malayalamdefinition?: string;
};

export const OlamDBSchema = {
  name: 'OlamDB',
  properties: {
    id: 'int',
    englishword: 'string?',
    partofspeech: 'string?',
    malayalamdefinition: 'string?',
  },
  primaryKey: 'id',
};

export const Schema = [OlamDBSchema];
