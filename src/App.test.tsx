import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import store from './utility/store';
import App from './App';

test('renders pokegram', () => {
  render(
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
);
  const linkElement = screen.getByText(/pokegram/i);
  expect(linkElement).toBeInTheDocument();
});
