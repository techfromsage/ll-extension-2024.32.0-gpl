import React, {
  MouseEvent, useContext, useEffect, useState,
} from 'react';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import Checkbox from '@/subComponents/Checkbox/Checkbox';
import { SciwheelProject } from '@/interfaces/sciwheel/SciwheelProject';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import ActionPanel from '@/subComponents/ReferenceManager/ActionPanel';
import browserMethods from '@/browserMethods';
import postImportIds from '@/modules/referenceManager/postImportIds';
import Loading from '@/components/App/Loading';
import TruncateString from '@/modules/shared/TruncateString';
import StripHtmlTags from '@/modules/shared/StripHtmlTags';
import AppActiveState from '@/enums/stateMachine/AppActiveState';
import pageResources from '@/content-script/pageResources';
import MenuPlacement from '@/enums/MenuPlacement';
import AvailableReferences from '@/modules/referenceManager/AvailableReferences';
import PlatformCheck from '@/modules/shared/platforms/PlatformCheck';
import Platform from '@/interfaces/Platform';
import { CombinedMetadata } from '@/modules/referenceManager/CombinedMetadata';
import SearchPageSavedCitation from './SearchPageSavedCitation';

interface SearchPageProps {
  digitalResources: DigitalResource[],
  isModal?: boolean,
}

interface ParsedData extends DigitalResource {
  savedArticleId?: string,
}

const SearchPage = ({ digitalResources, isModal = false }: SearchPageProps) => {
  const url = new URL(window.location.href);
  const {
    storeState: {
      user, config, institutes,
    }, appActive,
  } = useContext(AppActiveReactContext);
  const [loading, setLoading] = useState(true);
  const [selectedResources, setSelectedResources] = useState<DigitalResource[]>([]);
  const [selectedProject, setSelectedProject] = useState<SciwheelProject>();
  const [importPdf, setImportPdf] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState<ParsedData[]>([]);
  const [savedCitation, setSavedCitation] = useState<{ identifier: string, id: number }[]>([]);
  const [toggleSelectAll, setToggleSelectAll] = useState(false);
  const hasImportPdfOption = false;

  const parseArticlesWithIsSavedProperty = (data: DigitalResource[]) => {
    return data.map(resource => {
      const savedArticleId = savedCitation.find(item => (item.identifier === resource.metadata?.doi
         || item.identifier === resource.identifier))?.id;
      return {
        ...resource,
        savedArticleId: savedArticleId?.toString(),
      };
    });
  };

  const handleSelectAll = (): void => {
    setToggleSelectAll(!toggleSelectAll);
    setSelectedResources(toggleSelectAll ? [] : parsedData.filter(resource => resource.identifier));
  };

  const handleResourceSelect = (event: MouseEvent): void => {
    const { checked, id } = event.target as HTMLInputElement;
    const eventDigitalResource = parsedData.find(resource => resource.identifier === id);
    setSelectedResources(prevSelectedResources => {
      if (checked && eventDigitalResource) {
        return [...prevSelectedResources, eventDigitalResource];
      }
      return prevSelectedResources.filter(resource => resource.identifier !== id);
    });
  };

  const handleSaveReference = async () => {
    if (!selectedResources.length || !selectedProject || !user) {
      return;
    }
    setLoading(true);
    setSelectedResources([]);
    setToggleSelectAll(false);
    const response = await postImportIds(
      config?.api.sciwheel.importIds || '',
      browserMethods.app.contentScript.httpRequest,
      user,
      selectedProject,
      selectedResources,
      window.location.toString(),
    );
    if (response) {
      setSavedCitation(prevSavedCitations => {
        const mappedArray = Object.entries(response).map(([key, value]) => {
          return {
            identifier: key,
            id: value,
          };
        });
        return [...prevSavedCitations, ...mappedArray];
      });
      setLoading(false);
    }
  };

  const savedResourcesTitle = parsedData.length === 1 ? 'Reference found' : 'References found';

  const pageResourcesWithMetadata = async () => {
    if (config) {
      const data = await pageResources(
        window.document,
        institutes,
        url,
        config,
        browserMethods.app.contentScript.httpRequest,
        true,
      );

      // If modal (import cited articles); remove primary resource from available references
      if (isModal) {
        const availableReferences = AvailableReferences(data)
          // Remove primary resource from citable references
          .filter(({ identifier }) => identifier !== digitalResources[0].identifier)
          // Remove fragments, eg chapters, from citable references
          .filter(({ identifier }) => !identifier.includes(digitalResources[0].identifier));
        return setParsedData(parseArticlesWithIsSavedProperty(availableReferences));
      }

      const platform = PlatformCheck(window.location.href).current();

      return platform === Platform.GoogleScholar
        ? setParsedData(parseArticlesWithIsSavedProperty(digitalResources))
        : setParsedData(parseArticlesWithIsSavedProperty(data));
    }

    return {};
  };

  const processResources = async () => {
    await pageResourcesWithMetadata();
    setLoading(false);
  };

  useEffect(() => {
    processResources();
  }, [savedCitation, digitalResources]);

  return (
    <>
      {(loading || appActive !== AppActiveState.On) && <Loading text="🤖 Loading..." asOverlay />}
      <div className="search-page flex-column">
        <div className="search-page__reference-list flex-column">
          <div className="search-page__info">
            {parsedData.length}
            {' '}
            {savedResourcesTitle}
          </div>
          <Checkbox
            name="Select All"
            text="Select All"
            onClick={handleSelectAll}
            handleSelectAll={toggleSelectAll}
            defaultChecked={false}
          />
          <hr />
          <div className="search-page__resources flex-column">
            {parsedData.map((resource: ParsedData) => {
              const metadata = CombinedMetadata(resource);
              if (resource.savedArticleId && selectedProject) {
                return (
                  <SearchPageSavedCitation
                    key={resource.identifier}
                    text={TruncateString(StripHtmlTags(metadata.articleTitle))}
                    projectId={selectedProject.id}
                    articleId={resource.savedArticleId}
                  />
                );
              }
              return (
                <div key={resource.identifier} className="search-item">
                  <Checkbox
                    name={resource.identifier}
                    text={TruncateString(StripHtmlTags(metadata.articleTitle))}
                    onClick={handleResourceSelect}
                    handleSelectAll={toggleSelectAll}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <ActionPanel
          resourceCount={digitalResources.length}
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
      </div>
    </>
  );
};

export default SearchPage;
