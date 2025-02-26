import React, { useContext } from 'react';
import NotificationUI, { NotificationUIButtonLevel } from '@/interfaces/ui/NotificationUI';
import Banner from '@/subComponents/Banner/Banner';
import Button from '@/subComponents/Buttons/Button';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import ComponentType from '@/enums/ui/ComponentType';
import Label from '@/subComponents/Label/Label';
import ExpandIcon from '@/icons/ExpandIcon';
import SettingsFormReactContext from '@/components/Context/SettingsFormReactContext';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';

interface Props {
  notification: NotificationUI,
}

/**
 * Used to display the notification banners like ebook print and citation
 *
 * @param {NotificationUI} notification
 * @returns {JSX.Element}
 */
const NotificationBanners = ({ notification }: Props) => {
  const { storeState: { institutes, userPreferences } } = useContext(AppActiveReactContext);
  const { sendSettingsFormsState } = useContext(SettingsFormReactContext);

  const onBannerClose = (feature: string) => {
    sendSettingsFormsState(SettingsFormEvent.Submit, {
      name: `featureBannerShown.${feature}`,
      value: [true],
    });
  };

  // print banner conditions
  const { cards } = notification;
  const showPrintBanner = cards
    && cards?.[0]?.buttons?.some(button => button.level === NotificationUIButtonLevel.Tertiary)
    && !userPreferences.featureBannerShown?.ebookPrint;

  // citation banner conditions
  const isCitationEnabledByInstitute = institutes.some(institute => institute.modules_enabled.citations !== false);
  const isCitationEnabledByUser = userPreferences.integrations?.citation?.enabled !== false;
  const showCitationBanner = ['journal-article', 'book', 'monograph', 'edited-book']
    .includes(notification?.metadata?.digitalResource?.metadata?.type || '')
    && isCitationEnabledByInstitute
    && isCitationEnabledByUser
    && !userPreferences.featureBannerShown?.citation;

  return (
    <>
      { showPrintBanner && (
        <Banner
          title="Prefer reading in print?"
          message={(
            <>
              Check if your library has specific ebooks in print by clicking
              <Button
                className="button-tertiary button-inline"
                text="Check for print"
                buttonType="newtab"
                disabled
              />
              under ebook titles.
            </>
          )}
          onClose={() => onBannerClose('ebookPrint')}
          label={<Label text="New" type={ComponentType.NewFeature} />}
          type={ComponentType.NewFeature}
        />
      )}
      { showCitationBanner && (
        <Banner
          title="Cite with confidence"
          message={(
            <>
              Generate quick and accurate citations to the resources you&apos;re referencing.
              Simply click &quot;Get citation&quot; and cite with confidence.
              <a
                href="https://leanlibrary.zendesk.com/hc/en-gb/articles/17195308223645-Lean-Library-Cite-What-is-it"
                className="button-tertiary button-inline"
                target="_blank"
                rel="noreferrer"
              >
                <ExpandIcon />
                {' '}
                Learn More
              </a>
            </>
          )}
          onClose={() => onBannerClose('citation')}
          label={<Label text="New" type={ComponentType.NewFeature} />}
          type={ComponentType.NewFeature}
        />
      )}
    </>
  );
};

export default NotificationBanners;
