import React from 'react';
import {render, screen} from '@testing-library/react'
import TeamView from './TeamView';
import Team from '../Team/Team';
import { Provider } from 'react-redux';
import store from '../../utility/store'
import { BrowserRouter } from 'react-router-dom';

describe('Team View', () =>  {
    it('renders message to login if user is not logged in', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <TeamView />
                </BrowserRouter>
            </Provider>
        
        )
        expect(screen.getByText(/Please Login to view or create your team/i)).toBeInTheDocument()
    })
})