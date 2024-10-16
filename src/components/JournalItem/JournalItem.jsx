import './JournalItem.css';

const JournalItem = ({ title, text, date }) => {
  let formattedDate = 'Invalid date';

  if (date instanceof Date && !isNaN(date)) {
    formattedDate = new Intl.DateTimeFormat('ru-RU').format(date);
  }

  return (
    <>
      <h2 className="journal-item__header">{title}</h2>
      <div className="journal-item__body">
        <div className="journal-item__date">{formattedDate}</div>
        <div className="journal-item__text">{text}</div>
      </div>
    </>
  );
};

export default JournalItem;
