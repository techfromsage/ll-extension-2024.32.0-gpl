import React, { useContext, useEffect, useState } from 'react';
import State from '@/enums/State';
import Feature from '@/enums/Feature';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import ContentType from '@/enums/futures/ContentType';
import ModalItem from '@/interfaces/libraryResources/ModalItem';
import LibraryServicesItem from '@/interfaces/libraryResources/LibraryServicesItem';
import fetchModalItem from '@/modules/shared/notifications/fetchModalItem';
import LayoutReactContext from '@/components/Context/LayoutReactContext';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import Link from '@/subComponents/Link/Link';
import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import browserMethods from '@/browserMethods';
import FuturesStatType from '@/enums/FuturesStatType';

const ServicesLinks = (libraryServices: LibraryServicesItem[]) => {
  const { storeState: { config, institutes } } = useContext(AppActiveReactContext);
  const { sendLayoutState } = useContext(LayoutReactContext);
  const [links, setLinks] = useState<ModalItem[]>([]);

  useEffect(() => {
    libraryServices.forEach(service => {
      if (service.libraryResourceType === LibraryResourceType.Libchat) {
        return;
      }

      fetchModalItem(
        config?.api.libraryResource || '',
        service.id,
        browserMethods.app.contentScript.httpRequest,
        service.libraryResourceType,
      ).then(res => {
        if (!res) {
          return;
        }

        setLinks(previous => [...previous, res]);
      });
    });
  }, []);

  const contentLinkClickHandler = (e: React.MouseEvent, link: ModalItem) => {
    e.preventDefault();
    const institution = institutes.find(({ id }) => link.institution);
    sendLayoutState(LayoutEvent.Modal, {
      modalNotification: {
        id: link.uuid,
        title: link.title,
        institution,
        state: State.Modal,
        feature: Feature.LibraryServices,
        libraryResourceType: link.type,
        hasBeenClosed: true,
      },
    });
  };

  const clickHandler = (e: React.MouseEvent, link: ModalItem) => {
    if (link.type === LibraryResourceType.Faq) {
      browserMethods.app.statEventFutures({
        type: FuturesStatType.FaqClicked,
        module_uuid: link.uuid,
        trigger_url: window.location.href,
        institute_id: link.institution,
      });
    }
    if (link.contentType !== ContentType.Link) {
      contentLinkClickHandler(e, link);
    }
  };

  return (
    links.map(link => (
      <Link
        key={link.uuid}
        href={link.content}
        onClick={e => clickHandler(e, link)}
        block
        text={`${link.title} >`}
      />
    ))
  );
};

export default ServicesLinks;
