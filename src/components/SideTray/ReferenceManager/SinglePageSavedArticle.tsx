import React, { useEffect, useState } from 'react';
import bootstrap from '@bootstrap/index';
import browserMethods from '@/browserMethods';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import ThreeDotsIcon from '@/icons/ThreeDotsIcon';
import PdfIncludedIcon from '@/icons/PdfIncludedIcon';
import Button from '@/subComponents/Buttons/Button';
import OverlayModal from '@/components/OverlayModal/OverlayModal';
import TruncateString from '@/modules/shared/TruncateString';
import StripHtmlTags from '@/modules/shared/StripHtmlTags';
import SearchPage from '@/components/SideTray/ReferenceManager/SearchPage';
import CheckedBookmark from '@/icons/CheckedBookmark';
import trimString from '@/modules/referenceManager/trimString';
import { CombinedMetadata } from '@/modules/referenceManager/CombinedMetadata';

interface SinglePageSavedArticleProps {
  article: DigitalResource,
  libraryItemId: number | undefined,
  digitalResources: DigitalResource[],
  citedArticles: DigitalResource[],
}

const DetailItem = ({ subtitle, text }: { subtitle: string, text: string }) => {
  return (
    <div className="single-page-saved-article__detail-item">
      <span className="subtitle">
        { subtitle}
      </span>
      <span className="text">
        { text }
      </span>
    </div>
  );
};

const SinglePageSavedArticle = ({
  article, libraryItemId, digitalResources, citedArticles,
}: SinglePageSavedArticleProps) => {
  const [resources, setResources] = useState<DigitalResource[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const isPdfIncluded = digitalResources[0]?.metadata?.openAccess?.unpaywall?.locations[0].url;
  const metadata = CombinedMetadata(article);

  const openSciwheelDashboard = () => {
    if (libraryItemId) {
      browserMethods.tabs.contentScript.create(
        `${bootstrap.api.sciwheel.base}/work/#/items/${libraryItemId}`,
      );
    }
  };

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  useEffect(() => {
    setResources(digitalResources);
  }, []);

  return (
    <>
      {/* This is for "view cited articles" */}
      {modalOpened && (
        <OverlayModal closing={!modalOpened}>
          <div className="width-100 text--right single-page-saved-article__modal-button">
            <Button
              className="button button-as-text inline-button"
              onClick={closeModal}
              text="Done"
            />
          </div>
          <div className="single-page-saved-article__modal-content">
            <SearchPage digitalResources={resources} isModal />
          </div>
        </OverlayModal>
      )}
      {/* This is for the saved article */}
      <div className="single-page-saved-article">
        <div className="single-page-saved-article__header">
          <div className="single-page-saved-article__header-left">
            <CheckedBookmark />
            <span>SAVED</span>
          </div>
          <div className="single-page-saved-article__header-right">
            {isPdfIncluded
            && (
            <div className="single-page-saved-article__file-type">
              <PdfIncludedIcon />
              <span>PDF included</span>
            </div>
            )}
            <div className="single-page-saved-article__menu">
              <ThreeDotsIcon />
            </div>
          </div>
        </div>
        <span className="single-page-saved-article__title">
          {TruncateString(StripHtmlTags(metadata.articleTitle))}
        </span>
        <div className="single-page-saved-article__details-wrapper">
          { metadata?.publisher
            && <DetailItem subtitle="Details" text={`${metadata?.publisher} p. ${metadata?.startPage}`} /> }
          { metadata?.author
            && (
            <DetailItem
              subtitle="Authors"
              text={trimString(metadata.author, 100)}
            />
            ) }
          { metadata?.doi
            && <DetailItem subtitle="DOI" text={metadata.doi} /> }
          { metadata?.isbn
            && <DetailItem subtitle="ISBN" text={metadata.isbn} /> }
        </div>
        <div className="single-page-saved-article__buttons">
          <Button
            className="button-neutral"
            onClick={openSciwheelDashboard}
            text="View in Sciwheel"
            buttonType="newtab"
          />
          { citedArticles.length > 1 && (
            <Button
              className="button-primary"
              onClick={openModal}
              text="View cited articles"
            />
          ) }
        </div>
      </div>
    </>
  );
};

export default SinglePageSavedArticle;
