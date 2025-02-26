import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import bootstrap from '@bootstrap/index';
import Button from '@/subComponents/Buttons/Button';
import Card from '@/subComponents/Card/Card';
import ExpandIcon from '@/icons/ExpandIcon';
import EditIcon from '@/icons/EditIcon';
import BinIcon from '@/icons/BinIcon';
import HighlightAndAnnotateEvent from '@/enums/stateMachine/HighlightAndAnnotateEvent';
import Switch from '@/subComponents/Switches/Switch';
import SettingsFormEvent from '@/enums/stateMachine/SettingsFormEvent';
import AppActiveReactContext from '@/components/Context/AppActiveReactContext';
import CopyIcon from '@/icons/CopyIcon';
import JumpToIcon from '@/icons/JumpToIcon';
import Annotation from '@/interfaces/highlightAndAnnotate/Annotation';
import scrollToHighlightElement from '@/modules/highlightAndAnnotate/helpers/scrollToHighlightElement';

export enum DropdownMenuAction {
  Toggle = 'toggle',
  Copy = 'copy',
  ScrollTo = 'ScrollTo',
  Edit = 'edit',
  View = 'view',
  Delete = 'delete',
}
interface Props {
  text: string,
  actions: DropdownMenuAction[],
  annotation?: Annotation,
}

// eslint-disable-next-line complexity
const DropdownMenu = ({
  text,
  actions = [],
  annotation,
}: Props) => {
  const { storeState: { user, appSettings: { highlightAndAnnotateEnabled } } } = useContext(AppActiveReactContext);

  const [toggle, setToggle] = useState(highlightAndAnnotateEnabled);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    author, id, libraryItemId, quote,
  } = annotation || {};

  const isAuthorOfAnnotation = author?.id === user?.id;

  const handleClickOutside = (event: MouseEvent) => {
    // Get the path of the event, including through shadow DOMs
    const path = event.composedPath();

    // Check if the path includes the dropdown menu or the toggle button
    const isClickInside = path.some((element: EventTarget) => {
      return element instanceof Element
        && (element === dropdownRef.current || element.classList.contains('dropdown__toggle'));
    });

    // If the click is not inside the dropdown menu or on the toggle button, close the dropdown
    if (!isClickInside) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSwitch = () => {
    const newValue = !toggle;
    window.stateInterpreterSettingsForm.send(
      SettingsFormEvent.Submit,
      { name: 'highlightAndAnnotateEnabled', value: [newValue] },
    );

    window.stateInterpreterHighlightAndAnnotate.send(
      newValue ? HighlightAndAnnotateEvent.TurnOn : HighlightAndAnnotateEvent.TurnOff,
    );

    setToggle(newValue);
  };

  const handleEdit = () => {
    // TODO: Re-implement edit annotation flow
  };

  const handleDelete = () => {
    if (!isAuthorOfAnnotation) {
      return;
    }

    const pageData = { id };
    window.stateInterpreterHighlightAndAnnotate.send(HighlightAndAnnotateEvent.DeleteAnnotation, { pageData });
  };

  const handleCopyAnnotation = () => {
    const hasClipboard = 'clipboard' in navigator;
    if (!hasClipboard || !quote) {
      return;
    }

    navigator.clipboard.writeText(quote);
    setDropdownOpen(false);
  };

  return (
    <div className="dropdown">
      <Button
        className={`dropdown__toggle ${dropdownOpen ? 'dropdown__toggle--dropdownOpen' : ''}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        text={text}
        buttonType="dropdownToggle"
        hiddenText
      />
      {dropdownOpen && (
        <div className="dropdown__menu" aria-labelledby="dropdownMenuButton" ref={dropdownRef}>
          <Card className="card--bordered card--shadow">
            <p className="dropdown__menu__header">Quick actions settings</p>
            <div className="dropdown__menu__items">
              {actions.includes(DropdownMenuAction.Toggle) && (
                <>
                  <Switch
                    text="Highlight & notes"
                    checked={toggle}
                    name="notes"
                    boldText
                    onClick={handleSwitch}
                  />
                  {actions.length > 1 && <div className="dropdown__menu__items__divider" />}
                </>
              )}
              {actions.includes(DropdownMenuAction.Copy) && quote && (
                <button
                  type="button"
                  className="dropdown__menu__items__item"
                  onClick={handleCopyAnnotation}
                  data-testid="Button-Copy highlight"
                >
                  <CopyIcon />
                  {' '}
                  Copy highlight
                </button>
              )}
              {actions.includes(DropdownMenuAction.ScrollTo) && id && (
                <button
                  type="button"
                  className="dropdown__menu__items__item"
                  onClick={() => scrollToHighlightElement(id)}
                  data-testid="Button-Scroll to highlight"
                >
                  <JumpToIcon />
                  {' '}
                  Jump to highlight
                </button>
              )}
              {actions.includes(DropdownMenuAction.Edit) && isAuthorOfAnnotation && (
                <button
                  type="button"
                  className="dropdown__menu__items__item"
                  onClick={handleEdit}
                  data-testid="Button-Edit annotation"
                >
                  <EditIcon />
                  {' '}
                  Edit annotation
                </button>
              )}
              {actions.includes(DropdownMenuAction.View) && libraryItemId && (
                <a
                  className="dropdown__menu__items__item"
                  href={bootstrap.api.sciwheel.viewLibraryItem.replace('{libraryItemId}', libraryItemId)}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="Link-View in Sciwheel"
                >
                  <ExpandIcon fill="#555555" />
                  {' '}
                  View in Sciwheel
                </a>
              )}
              {actions.includes(DropdownMenuAction.Delete) && isAuthorOfAnnotation && (
                <>
                  <div className="dropdown__menu__items__divider" />
                  <button
                    type="button"
                    className="dropdown__menu__items__item"
                    onClick={handleDelete}
                    data-testid="Button-Delete annotation"
                  >
                    <BinIcon />
                    {' '}
                    Delete annotation
                  </button>
                </>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
