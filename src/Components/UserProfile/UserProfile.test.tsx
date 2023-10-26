import React from 'react';
import { render, screen, act, fireEvent, cleanup , waitFor } from '@testing-library/react';
//import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Route,Routes, BrowserRouter, MemoryRouter } from "react-router-dom";
import UserProfile from './UserProfile';
import { RootState } from '../../utility/reduxTypes'; // Import your RootState
import AxiosMockAdapter from 'axios-mock-adapter';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
jest.mock('axios'); // Mock Axios for API calls
const middlewares: any[] = [];
const mockStore = configureStore<RootState, any>(middlewares);
test('Renders UserProfile', async () => {
  const mockProfileId = '5e22sdf-23dw-mockedProfileId';

  const initialState: RootState = {
    auth: {
      user_id: "21a4fe80-ce1d-42d0-8718-22e580940267",
      name: "JoshuaSanchez",
      username: "JoshuaSanchez2",
      token: "faketoken",
    },
  };
  const mockProfileInfo = {
      bio:"gotta catch em all",
      image_url:"https://picsum.photos/id/237/200/300"
  };
  const mockFriendsLists = {
      friendsList: [{user_id :"9e9a13f3-a119-462b-aae0-bc594caedefb", search_username : "arin808",username :"arin808"}]
  };
  const mockUsernameResponse = {
      username: "JoshuaSanchez2"
  };
  const mockPostsResponse = {
      data:[
        {
          text_body: "elite trainer keyton reporting for duty!",
          user_id_fk: "5cafef44-7453-4381-8815-cd73e3fd037b",
          post_id: "e347f252-7ff3-4d5f-b58d-31370dc1554d",
          tags: [],
          image_s3_id: "https://picsum.photos/id/237/200/300",
        }
      ]
  }
  const mockImageGetResponse = {
    image_url:"https://picsum.photos/id/237/200/300"
  }
  const mockTeamGetResponse = {
    body:{
      user_id: `${mockProfileId}`,
      teamName: "work pls",
      pokemonList: [ {nickname: "Bob", pokemonName : "Charmander",level: "10"} ]
    }
  }
  const mockPokemonFetchResponse = {
    id:"82390jahsdkjfnlasd",
    name:"dog",
    sprites:{ front_default: "https://picsum.photos/id/237/200/300" }
  }

  const urlGetProfile = `http://52.90.96.133:5500/api/profiles/5e22sdf-23dw-mockedProfileId`;
  const urlGetFriends = `http://52.90.96.133:5500/api/users/21a4fe80-ce1d-42d0-8718-22e580940267/friends`;
  const urlGetUsername = `http://52.90.96.133:5500/api/profiles/5e22sdf-23dw-mockedProfileId/username`;
  const urlGetPosts = `http://52.90.96.133:5500/api/post/user?user_id=5e22sdf-23dw-mockedProfileId`
  const urlGetImage = `http://52.90.96.133:5500/api/post/image?image_id=${mockPostsResponse.data[0].image_s3_id}`
  const urlGetPokemonTeam = `http://52.90.96.133:5500/api/teams/${mockProfileId}`
  const expectedHeaders = {
    'Authorization': `Bearer ${initialState.auth.token}`,
    'Content-Type': 'application/json',
  };
  jest.mock("axios");
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.get.mockImplementation((url, config) => {
    if(!config){
      return Promise.reject(new Error('Request did not match expected URL and headers', ));
    }
    if (url == urlGetProfile/* && /*config.headers == expectedHeaders*/) {
      return Promise.resolve({status:200, data: mockProfileInfo });
    }
    else if(url == urlGetFriends /*&&  /*config.headers == expectedHeaders*/){
      return Promise.resolve({status:200, data: mockFriendsLists });
    }
    else if(url == urlGetUsername /*&& config.headers == expectedHeaders*/){
      return Promise.resolve({status:200, data: mockUsernameResponse });
    }
    else if(url == urlGetPosts /* && /*config.headers == expectedHeaders*/){
      return Promise.resolve({status:200, data: mockPostsResponse });
    }
    else if(url == urlGetImage  /*&& config.headers == expectedHeaders*/){
      return Promise.resolve({status:200, data: mockImageGetResponse });
    }
    else if(url == urlGetPokemonTeam /*&& config.headers == expectedHeaders*/){
      return Promise.resolve({status:200, data: mockTeamGetResponse });
    }
    else {
      console.error(" url failed:: ", url)
      return Promise.reject(new Error('Request did not match expected URL and headers', ));
    }
  });
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockPokemonFetchResponse),
    }),
  ) as jest.Mock;
  const testStore = mockStore(initialState);
    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={[`/profile/${mockProfileId}`]}>
          <Routes>
              <Route path="profile/:profile_id" element = {<UserProfile postProfile={false}/>}/>
          </Routes>
        </MemoryRouter>  
      </Provider>
    );
  const expectedText1 = 'JoshuaSanchez2';
  expect(await screen.findByText(expectedText1)).toBeInTheDocument();
  const addButton = screen.getByText('+ Add Friend'); // Replace with the text on your button
  fireEvent.click(addButton);
  const expectedText2 = '✔ Friends';
  expect(await screen.findByText(expectedText2)).toBeInTheDocument();
  const removeButton = screen.getByText('✔ Friends'); // Replace with the text on your button
  fireEvent.click(removeButton);
  const expectedText3 = '+ Add Friend';
  expect(await screen.findByText(expectedText3)).toBeInTheDocument();
});