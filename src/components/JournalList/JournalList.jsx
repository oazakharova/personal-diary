import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

const JournalList = ({ items }) => {
  if (items.length === 0) return <div>Записей пока нет</div>;

  const sortItems = (item1, item2) => {
    if (item1.date > item2.date) return 1;
    else return -1;
  };

  return (
    <div className="journal-list">
      {items.sort(sortItems).map((el) => (
        <CardButton key={el.id}>
          <JournalItem
            title={el.title}
            date={el.date}
            text={el.text}
            id={el.id}
          />
        </CardButton>
      ))}
    </div>
  );
};

export default JournalList;
