import InstitutionObject from '@/interfaces/InstitutionObject';
import { ContentConfig } from '@/interfaces/Config';
import { StoreSlice } from '@/store';
import Institution from '@/interfaces/Institution';
import merge from 'lodash.merge';
import Translation from '@/interfaces/Translation';

export interface ContentSlice {
  content: InstitutionObject<ContentConfig>,
  setContent: (
    institutions: Institution[],
    translations: InstitutionObject<Translation>,
    selectedTranslation: string,
    contentConfig: ContentConfig | undefined) => void,
}

const getSelectedTranslationContent = (
  instituteId: string,
  translations: InstitutionObject<Translation>,
  selectedTranslation: string,
) => {
  const translation = translations[instituteId][selectedTranslation];
  const { primaryLang } = translations[instituteId];

  return translation && Object.keys(translation).length ? translation : translations[instituteId][primaryLang];
};

export const createContentSlice: StoreSlice<ContentSlice> = set => ({
  content: {},
  setContent: (institutions, translations, selectedTranslation, contentConfig) => {
    if (!contentConfig) {
      return;
    }
    const content = institutions.reduce(
      (all, institution) => ({
        ...all,
        [institution.id]: merge(
          JSON.parse(JSON.stringify(contentConfig)),
          JSON.parse(JSON.stringify(institution.text)),
          JSON.parse(JSON.stringify(getSelectedTranslationContent(institution.id, translations, selectedTranslation))),
        ),
      }),
      {},
    );
    set({ content });
  },
});
