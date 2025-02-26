import React from 'react';
import Card from '@/subComponents/Card/Card';
import Button from '@/subComponents/Buttons/Button';

interface Props {
  note: string,
  setNote: React.Dispatch<React.SetStateAction<string>>,
  handleClose: () => void,
  handleSaveNote: (note: string) => void,
}

const InputCard = ({
  note,
  setNote,
  handleClose,
  handleSaveNote,
}: Props) => {
  const maxNoteLength = 4000; // TODO: To be defined

  const sanitizeNoteInput = () => {
    const div = document.createElement('div');
    div.innerHTML = note;
    return div.textContent || div.innerText || '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxNoteLength) {
      setNote(e.target.value);
    }
  };

  const handleSkip = () => {
    // Skip note and close the input card
    handleClose();
  };

  const handleSave = () => {
    // Save note and close the input card
    handleSaveNote(sanitizeNoteInput());
    handleClose();
  };

  return (
    <div className="input-card-wrapper">
      <Card className="card--bordered card--shadow card--narrow">
        <div className="input-card">
          <textarea
            data-testid="NoteInput"
            placeholder="Add optional note..."
            value={note}
            onChange={handleChange}
          />
          <div className="input-card__buttons">
            <Button className="button button-neutral button--no-margin button--small" text="Skip" onClick={handleSkip} />
            <Button className="button button-primary button--no-margin button--small" text="Save" onClick={handleSave} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InputCard;
