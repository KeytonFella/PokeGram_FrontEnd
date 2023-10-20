import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import store from '../../utility/store';
import Navbar from './Navbar';

test('renders navbarw', () => {
  render(
    <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
    </Provider>
);
  const homeLink = screen.getByText(/home/i);
  const postsLink = screen.getByText(/posts/i);
  const tradesLink = screen.getByText(/trades/i);
  const loginLink = screen.getByText(/login/i);
  const registerLink = screen.getByText(/register/i);

  expect(homeLink).toBeInTheDocument();
  expect(postsLink).toBeInTheDocument();
  expect(tradesLink).toBeInTheDocument();
  expect(loginLink).toBeInTheDocument();
  expect(registerLink).toBeInTheDocument();
});
