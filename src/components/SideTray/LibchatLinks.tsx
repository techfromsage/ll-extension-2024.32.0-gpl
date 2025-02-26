import React, { useContext, useEffect, useState } from 'react';
import LibraryServicesItem from '@/interfaces/libraryResources/LibraryServicesItem';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import Link from '@/subComponents/Link/Link';
import LibchatItem from '@/interfaces/libraryResources/LibchatItem';
import LibraryResourceType from '@/enums/futures/LibraryResourceType';
import fetchLibchatItem from '@/modules/shared/notifications/fetchLibchatItem';
import browserMethods from '@/browserMethods';
import FuturesStatType from '@/enums/FuturesStatType';

const LibchatLinks = (libraryServices: LibraryServicesItem[]) => {
  const { storeState: { config, institutes } } = useContext(AppActiveReactContext);
  const [links, setLinks] = useState<LibchatItem[]>([]);

  useEffect(() => {
    libraryServices.forEach(service => {
      if (service.libraryResourceType !== LibraryResourceType.Libchat) {
        return;
      }

      fetchLibchatItem(
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

  const clickHandler = (e: React.MouseEvent, link: LibchatItem) => {
    e.preventDefault();
    browserMethods.app.statEventFutures({
      type: FuturesStatType.LibChatClicked,
      module_uuid: link.uuid,
      trigger_url: window.location.href,
      institute_id: institutes[0].id,
    });
    window.open(link.url, '_blank', `popup,height=${link.height || 700},width=${link.width || 400}`);
  };

  return (
    links.map(link => (
      <Link
        key={link.uuid}
        href={link.url}
        onClick={e => clickHandler(e, link)}
        block
        text={`${link.name} >`}
      />
    ))
  );
};

export default LibchatLinks;
