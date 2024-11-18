import { useEffect, useReducer } from 'react';
import cn from 'classnames';
import { RiFolder6Line, RiCalendar2Line, RiArchiveLine } from 'react-icons/ri';

import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { formReducer, INITIAL_STATE } from './JournalForm.state';

const JournalForm = ({ onSubmit }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid } = formState;

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }
    return () => clearTimeout(timerId); // для очистки состояния
  }, [isValid]);

  const changeDateInput = (event) => {
    setDateInput(event.target.value);
    // console.log(event.target.value);
  };

  const addJournalItem = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.title.trim().length > 0) {
      setFormValidState((state) => ({ ...state, title: true }));
    } else {
      setFormValidState((state) => ({ ...state, title: false }));
    }

    if (formProps.text.trim().length > 0) {
      setFormValidState((state) => ({ ...state, text: true }));
    } else {
      setFormValidState((state) => ({ ...state, text: false }));
    }

    const formattedDate = new Date(dateInput);

    if (isNaN(formattedDate.getTime())) {
      console.error('Invalid date');
      setFormValidState((state) => ({ ...state, date: false }));
      return;
    } else {
      formProps.date = formattedDate;
      setFormValidState((state) => ({ ...state, date: true }));
    }

    if (!formValidState.title || !formValidState.date || !formValidState.text) {
      console.error('Form is not valid');
      return;
    }

    onSubmit(formProps);

    event.target.reset();
    setTitleInput('');
    setDateInput('');
    setTagInput('');
    setTextInput('');
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div className={cn(styles['input-wrap'])}>
        <input
          type="text"
          name="title"
          className={cn(styles['input-title'], {
            [styles['invalid']]: !isValid.title,
          })}
        />
        <RiArchiveLine />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <RiCalendar2Line />
          <span>Date</span>
        </label>
        <input
          type="date"
          id="date"
          value={dateInput}
          className={cn(styles['input'], {
            [styles['invalid']]: !isValid.date,
          })}
          onChange={changeDateInput}
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <RiFolder6Line />
          <span>Tag</span>
        </label>
        <RiFolder6Line />
        <input name="tag" id="tag" className={styles['input']} />
      </div>

      <textarea
        className={cn(styles['input'], {
          [styles['invalid']]: !isValid.text,
        })}
        name="text"
        cols="30"
        rows="10"
      ></textarea>
      <Button text={'Save'} onClick={() => console.log('pressed')} />
    </form>
  );
};

export default JournalForm;
