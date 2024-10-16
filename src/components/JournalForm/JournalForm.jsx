import { useState } from 'react';

import './JournalForm.css';
import Button from '../Button/Button';

const JournalForm = ({ onSubmit }) => {
  const [dateInput, setDateInput] = useState('');

  const changeDateInput = (event) => {
    setDateInput(event.target.value);
    console.log(event.target.value);
  };

  const addJournalItem = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    const formattedDate = new Date(dateInput);

    if (isNaN(formattedDate.getTime())) {
      console.error('Invalid date');
      return;
    }

    formProps.date = formattedDate;

    console.log('formProps: ', formProps);

    onSubmit(formProps);
  };

  return (
    <form className="journal-form" onSubmit={addJournalItem}>
      <input type="text" name="title" />
      <input type="date" value={dateInput} onChange={changeDateInput} />
      <input name="tag" />
      <textarea name="text" id="" cols="30" rows="10"></textarea>
      <Button text={'Save'} onClick={() => console.log('pressed')} />
    </form>
  );
};

export default JournalForm;
