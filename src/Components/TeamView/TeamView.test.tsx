import React from 'react';
import {render, screen} from '@testing-library/react'
import TeamView from './TeamView';
import Team from '../Team/Team';
import { Provider } from 'react-redux';
import store from '../../utility/store'
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import axios from 'axios';

describe('Team View', () =>  {
    // const initialState = {
    //     user_id: "bf9ead71-5d8f-4a6f-8a0b-92e8df9a72af",
    //     name: "Peter", 
    //     username: "peteruser",
    //     token: "token"
    // }
    
    beforeEach(() => {
        jest.restoreAllMocks()
    })
    test('renders message to login if user is not logged in', () => {
        const result = render(

            <Provider store={store}>
                <BrowserRouter>
                    <TeamView />
                </BrowserRouter>
            </Provider>
        
        )
        expect(screen.getByText(/Please login to view or create your team/i)).toBeInTheDocument()
    })
    

})