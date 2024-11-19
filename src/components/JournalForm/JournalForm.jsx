import { useEffect, useReducer } from 'react';
import cn from 'classnames';
import { RiFolder6Line, RiCalendar2Line, RiArchiveLine } from 'react-icons/ri';

import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { formReducer, INITIAL_STATE } from './JournalForm.state';

const JournalForm = ({ onSubmit }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.post || !isValid.title) {
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }
    return () => clearTimeout(timerId); // для очистки состояния
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: 'CLEAR' });
    }
  }, [isFormReadyToSubmit]);

  const onChangeValue = (event) => {
    dispatchForm({
      type: 'UPDATE_VALUE',
      payload: { [event.target.name]: event.target.value },
    });
  };

  const addJournalItem = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    dispatchForm({ type: 'SUBMIT', payload: formProps });
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
          value={values.title}
          onChange={onChangeValue}
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
          name="date"
          value={values.date}
          className={cn(styles['input'], {
            [styles['invalid']]: !isValid.date,
          })}
          onChange={onChangeValue}
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <RiFolder6Line />
          <span>Tag</span>
        </label>
        <RiFolder6Line />
        <input
          name="tag"
          id="tag"
          value={values.tag}
          onChange={onChangeValue}
          className={styles['input']}
        />
      </div>

      <textarea
        className={cn(styles['input'], {
          [styles['invalid']]: !isValid.post,
        })}
        name="post"
        value={values.post}
        onChange={onChangeValue}
        cols="30"
        rows="10"
      ></textarea>

      <Button text={'Save'} onClick={() => console.log('pressed')} />
    </form>
  );
};

export default JournalForm;
