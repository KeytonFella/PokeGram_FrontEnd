import React from 'react';
import { render, screen, act, fireEvent, cleanup , waitFor } from '@testing-library/react';
//import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Route,Routes, BrowserRouter, MemoryRouter } from "react-router-dom";
import Trades from './Trades';
import { RootState } from '../../utility/reduxTypes'; // Import your RootState
import axios from 'axios';
jest.mock('axios'); // Mock Axios for API calls
const middlewares: any[] = [];
const mockStore = configureStore<RootState, any>(middlewares);
test('Renders Trades', async () => {
  const mockProfileId = '5e22sdf-23dw-mockedProfileId';
  const initialState: RootState = {
    auth: {
      user_id: `21a4fe80-ce1d-42d0-8718-22e580940267`,
      name: "JoshuaSanchez",
      username: "JoshuaSanchez2",
      token: "faketoken",
    },
  };

  const mockGetDataResponse = {
    trades: {
        surrender_list:[7],
        desire_list:[4]
    }
  }
  const mockGetTradesResponse = {
    user_id: "mock_user_id",
    username: "mock_username",
    give_pokemon: [3],
    get_pokemon: [2],
  }
  const mockGetPokeIDResponse = {
    id: 7,
    species: {name: "charizard"},
    sprites: {front_default: "http://test/mock.img"}
  }

  const urlGetData = 'http://52.90.96.133:5500/api/trades/data';
  const urlGetTrades = 'http://52.90.96.133:5500/api/trades';
  const urlGetPokeSurrender = 'https://pokeapi.co/api/v2/pokemon/7'
  const urlGetPokeDesire = 'https://pokeapi.co/api/v2/pokemon/4'

  const urlSurrenderList = 'http://52.90.96.133:5500/api/trades/surrender-list'
  const urlDesireList = 'http://52.90.96.133:5500/api/trades/surrender-list'
//   const expectedHeaders = {
//     'Authorization': `Bearer ${initialState.auth.token}`,
//     'Content-Type': 'application/json',
//   };
  jest.mock("axios");
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.get.mockImplementation((url, config) => {//mock get requests
    if (url == urlGetData/* && /*config.headers == expectedHeaders*/) {
      return Promise.resolve({status:200, data: mockGetDataResponse});
    }
    else if(url == urlGetTrades /*&&  /*config.headers == expectedHeaders*/){
      return Promise.resolve({status:200, data: mockGetTradesResponse });
    }
    else if(url == urlGetPokeDesire || urlGetPokeSurrender /*&& config.headers == expectedHeaders*/){
      return Promise.resolve({status:200, data: mockGetPokeIDResponse });
    }
    else {
      console.error(" axios get url failed:: ", url)
      return Promise.reject(new Error('Request did not match expected URL and headers', ));
    }
  });
  mockedAxios.put.mockImplementation((url, data: any, config) => {
    if(url === urlSurrenderList && data.action === 'remove'){//remove from surrender list
        return Promise.resolve({status:200, message: "Removed from Surrender List"});
    }
    else if(url === urlSurrenderList && data.action === 'add'){//add to surrender list
        return Promise.resolve({status:200, message: "Added from Surrender List"});

    }else if(url === urlDesireList && data.action === 'remove'){//remove from desire list
        return Promise.resolve({status:200, message: "Removed from Desire List"});

    }else if(url === urlDesireList && data.action === 'add'){//add to desire list
        return Promise.resolve({status:200, message: "Added from Desire List"});
    }
    else{
        console.error(" axios get url failed:: ", url)

      return Promise.reject(new Error('Request did not match expected URL and headers'));
    }
  });
  const testStore = mockStore(initialState);
    render(
        <Provider store={testStore}>
            <Trades/>
        </Provider>
    );
  const expectedText1 = 'Charizard';
  const foundElements = await screen.findAllByText(expectedText1);
  foundElements.forEach(element => {
    expect(element).toBeInTheDocument();
  });
//   const removeButtons = await screen.findAllByText('Remove'); // Replace with the text on your button
//   removeButtons.forEach(button => {
//     fireEvent.click(button);
//   });
//   const inputElement = container.querySelector('input[name="your-input-name"]')
//   const addButtons = await screen.findAllByText('Add'); // Replace with the text on your button
//   addButtons.forEach(button => {
//     fireEvent.click(button);

//   });
//   const rebuiltElements = await screen.findAllByText(expectedText1);
//   rebuiltElements.forEach(element => {
//     expect(element).toBeInTheDocument();
//   });

});