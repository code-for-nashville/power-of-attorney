import React from 'react';
import ReactDOM from 'react-dom';
import AsyncDownload from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AsyncDownload />, div);
});