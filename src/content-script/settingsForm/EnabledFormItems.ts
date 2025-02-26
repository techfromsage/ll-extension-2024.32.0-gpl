import { EnabledItems } from '@/modules/shared/stateMachine/StateMachineSettingsForm';
import Institution from '@/interfaces/Institution';
import KeywordPackage from '@/interfaces/keywordEnhancements/KeywordPackage';

const alternatives = (all: EnabledItems, alternativeSettings: Institution['alternatives']) => {
  const {
    enabled, orderForm, ebookFinder, openAccess, fullTextFinder,
  } = alternativeSettings;
  return {
    orderForm: all.alternatives.orderForm || (enabled && orderForm.enabled),
    ebook: all.alternatives.ebook || (enabled && ebookFinder.enabled),
    openAccess: all.alternatives.openAccess || (enabled && openAccess.enabled),
    article: all.alternatives.article || (enabled && fullTextFinder.enabled),
  };
};

export default (institutes: Institution[], keywordPackages: KeywordPackage[]): EnabledItems => {
  return institutes.reduce(
    (all: EnabledItems, institution: Institution): EnabledItems => {
      return {
        alternatives: alternatives(all, institution.alternatives),
        autoRedirect: true,
        integrations: {
          scite: all.integrations.scite || institution.scite.enabled,
          citation: all.integrations.citation || institution.modules_enabled.citations,
        },
        keywordEnhancements: !!keywordPackages.length,
      };
    },
    {
      alternatives: {
        orderForm: false,
        ebook: false,
        openAccess: false,
        article: false,
      },
      autoRedirect: false,
      integrations: {
        scite: false,
        citation: true,
      },
      keywordEnhancements: false,
    },
  );
};
