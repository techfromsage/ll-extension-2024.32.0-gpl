import React, { MouseEvent, useContext, useState } from 'react';
import browserMethods from '@/browserMethods';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import ActionPanel from '@/subComponents/ReferenceManager/ActionPanel';
import { SciwheelProject } from '@/interfaces/sciwheel/SciwheelProject';
import Loading from '@/components/App/Loading';
import postImportIds from '@/modules/referenceManager/postImportIds';
import TruncateString from '@/modules/shared/TruncateString';
import StripHtmlTags from '@/modules/shared/StripHtmlTags';
import SavedArticleData from '@/interfaces/savedArticles/SavedArticleData';
import MenuPlacement from '@/enums/MenuPlacement';
import BookmarkCheckbox from '@/components/BookmarkCheckbox/BookmarkCheckbox';
import NonAcademicResource from '@/interfaces/sciwheel/NonAcademicResource';
import { CombinedMetadata } from '@/modules/referenceManager/CombinedMetadata';
import HighlightAndAnnotateReactContext from '@/components/Context/HighlightAndAnnotateReactContext';
import SinglePageSavedArticle from './SinglePageSavedArticle';
import HighlightAndAnnotateAccordion from './HighlightAndAnnotate/HighlightAndAnnotateAccordion';

interface SinglePageProps {
  digitalResources: DigitalResource[],
  citedArticles: DigitalResource[],
  article: DigitalResource & NonAcademicResource,
}

// eslint-disable-next-line complexity
const SinglePage = ({ article, digitalResources, citedArticles }: SinglePageProps) => {
  const { storeState: { user, config } } = useContext(AppActiveReactContext);
  const [loading, setLoading] = useState(false);
  const [selectedResources, setSelectedResources] = useState<(DigitalResource | NonAcademicResource)[]>([article]);
  const [selectedProject, setSelectedProject] = useState<SciwheelProject>();
  const [savedArticleData, setSavedArticleData] = useState<SavedArticleData>();
  const [importPdf, setImportPdf] = useState<boolean>(false);
  const hasImportPdfOption = false;
  const metadata = CombinedMetadata(article);

  const { highlightAndAnnotateData: { libraryItemId } } = useContext(HighlightAndAnnotateReactContext);

  const handleResourceSelect = (event: MouseEvent): void => {
    const { checked, id } = event.target as HTMLInputElement;
    setSelectedResources(prevSelectedResources => {
      if (checked && article) {
        return [...prevSelectedResources, article];
      }
      return prevSelectedResources.filter(resource => resource.identifier !== id);
    });
  };

  const handleSaveReference = async () => {
    if (!article || !selectedProject || !user) {
      return;
    }
    setLoading(true);
    const response = await postImportIds(
      config?.api.sciwheel.importIds || '',
      browserMethods.app.contentScript.httpRequest,
      user,
      selectedProject,
      [article],
      window.location.toString(),
    );
    if (response) {
      setSavedArticleData(
        {
          article,
          id: Object.values(response)[0],
        },
      );
      setLoading(false);
    }
  };

  const isArticleSaved = !!libraryItemId || !!savedArticleData?.id;

  return (
    <>
      {loading && <div><Loading text="🤖 Loading..." asOverlay /></div>}
      <div className={`single-page-article${libraryItemId ? '-saved' : ''}`}>
        <div className="single-page-article-container">
          {isArticleSaved ? (
            <>
              <SinglePageSavedArticle
                article={article}
                libraryItemId={libraryItemId || savedArticleData?.id}
                digitalResources={digitalResources}
                citedArticles={citedArticles}
              />
              <HighlightAndAnnotateAccordion />
            </>
          ) : (
            <>
              <p className="single-page-article__title">Article and cited resources</p>
              <BookmarkCheckbox
                name={article.identifier}
                text={TruncateString(StripHtmlTags(metadata?.articleTitle))}
                onClick={handleResourceSelect}
                defaultChecked
              />
            </>
          )}
        </div>
        {(!isArticleSaved)
          && (
          <ActionPanel
            resourceCount={1}
            selectedResourceCount={selectedResources.length}
            handleSaveReference={handleSaveReference}
            actionPanelState={{
              selectedProject,
              setSelectedProject,
              importPdf,
              setImportPdf,
            }}
            menuPlacement={MenuPlacement.Top}
            hasImportPdfOption={hasImportPdfOption}
          />
          )}
      </div>
    </>
  );
};

export default SinglePage;
