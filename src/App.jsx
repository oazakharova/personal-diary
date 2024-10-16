import { useState } from 'react';

import './App.css';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';
import LeftPanel from './components/layouts/LeftPanel/LeftPanel';
import Header from './components/Header/Header';
import Body from './components/layouts/Body/Body';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';

const INITIAL_DATA = [
  {
    title: 'Подготовка к обновлению',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    date: new Date(),
  },
  {
    title: 'Поход в горы',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    date: new Date(),
  },
];

function App() {
  const [items, setItems] = useState(INITIAL_DATA);

  const addItem = (item) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        title: item.title,
        text: item.text,
        date: new Date(item.date),
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          {items.map((el) => (
            <CardButton key={el.title}>
              <JournalItem title={el.title} date={el.date} text={el.text} />
            </CardButton>
          ))}
        </JournalList>
      </LeftPanel>

      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
