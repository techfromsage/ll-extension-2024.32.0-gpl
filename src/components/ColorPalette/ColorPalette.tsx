import React, { useState } from 'react';
import Card from '@/subComponents/Card/Card';
import DropdownMenu, { DropdownMenuAction } from '@/subComponents/DropdownMenu/DropdownMenu';
import colorPaletteColors from '@/components/ColorPalette/colorPaletteColors';
import InputCard from '@/components/InputCard/InputCard';
import HighlightAndAnnotateEvent from '@/enums/stateMachine/HighlightAndAnnotateEvent';
import ShadowList from '@/enums/ShadowList';

const ColorPalette = () => {
  const [selectedColor, setSelectedColor] = useState('');
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState('');

  const onColorClick = (color: string, abbreviation: string) => {
    // set the selected color and send the highlighted text to the state machine
    if (selectedColor !== color) {
      setSelectedColor(color);
      setNoteOpen(true);

      const { pageData } = window.stateInterpreterHighlightAndAnnotate.getSnapshot().context;

      window.stateInterpreterHighlightAndAnnotate.send(HighlightAndAnnotateEvent.SaveHighlightedText, {
        pageData: { ...pageData, color: abbreviation },
      });
    }

    // paint all the highlighted elements with the selected color
    window.document.querySelectorAll(`.${ShadowList.HighlightAndAnnotateElement}`).forEach(element => {
      const span = element as HTMLSpanElement;
      if (!span.dataset.id) {
        span.style.backgroundColor = color;
      }
    });
    // remove the selection
    window.getSelection()?.removeAllRanges();
  };

  const onUpdateAnnotation = () => {
    const { pageData } = window.stateInterpreterHighlightAndAnnotate.getSnapshot().context;
    window.stateInterpreterHighlightAndAnnotate.send(HighlightAndAnnotateEvent.UpdateAnnotation, {
      pageData: { ...pageData, text: note },
    });
  };

  return (
    <div className="color-palette-wrapper">
      <Card className="card--bordered card--shadow card--narrow">
        <div className="color-palette">
          <nav>
            <ul className="color-palette__colors">
              {colorPaletteColors.map(({
                name, background, stroke, abbreviation,
              }) => (
                <li key={name}>
                  <button
                    type="button"
                    className="color-palette__colors__color"
                    style={{
                      backgroundColor: background,
                      ...(selectedColor === background && {
                        border: '1px solid #FFFFFF',
                        outline: `2px solid ${stroke}`,
                      }),
                    }}
                    onClick={() => onColorClick(background, abbreviation)}
                    aria-label={selectedColor === background ? `${name} color selected` : `Highlight with ${name} color`}
                  />
                </li>
              ))}
            </ul>
          </nav>
          <div className="color-palette__colors__divider" />
          <div className="color-palette__colors__quick-settings">
            <DropdownMenu
              text="Quick actions settings"
              actions={[DropdownMenuAction.Toggle]}
            />
          </div>
        </div>
      </Card>
      {noteOpen && (
        <InputCard
          note={note}
          setNote={setNote}
          handleClose={() => setNoteOpen(false)}
          handleSaveNote={onUpdateAnnotation}
        />
      )}
    </div>
  );
};

export default ColorPalette;
