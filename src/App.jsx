import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import LeftPanel from './components/layouts/LeftPanel/LeftPanel';
import Header from './components/Header/Header';
import Body from './components/layouts/Body/Body';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';

const INITIAL_DATA = [
  {
    id: uuidv4(),
    title: 'Подготовка к обновлению',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    date: new Date(),
  },
  {
    id: uuidv4(),
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
        id: uuidv4(),
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
        <JournalList items={items} />
      </LeftPanel>

      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
