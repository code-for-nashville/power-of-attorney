import React from 'react';
import ReactDOM from 'react-dom';
import POAForm from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<POAForm />, div);
});