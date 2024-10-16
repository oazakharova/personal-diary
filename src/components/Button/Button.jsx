// import { useState } from 'react';
import './Button.css';

const Button = ({ text, onClick }) => {
  // const [text, setText] = useState('Сохранить');

  // const clicked = () => {
  //   setText('Закрыть');
  //   console.log('Hola');
  // };

  return (
    <button className="button accent" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
