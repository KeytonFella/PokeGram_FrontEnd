import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { get } from 'http';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';
import './PokemonList.scss';
import MessageModal from '../MessageModal/MessageModal';

const BASE_API = `http://52.90.96.133:5500/api/trades`;
const POKE_API = 'https://pokeapi.co/api/v2/pokemon/';

function AvailableTrades() {
    const [availableTrades, setAvailableTrades] = useState(Array<any>);
    const AuthState = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        getAvailableTrades();
      },[]);
    
    async function getAvailableTrades() {
        axios.get(BASE_API, {headers: {Authorization: 'Bearer ' + AuthState.token}})
        .then(function (response) {
            createTradesObj(response.data.trades);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    interface Trade {
        user_id: "",
        username: "",
        give_pokemon: [number],
        get_pokemon: [number]
    }

    async function createTradesObj(trade: [Trade]){
        let tradesArray = [];
        for(let i = 0; i < trade.length; i++){
            const username = trade[i].username;
            const user_id = trade[i].user_id;
            const give_pokemon = await createPokemonObj(trade[i].give_pokemon);
            const get_pokemon = await createPokemonObj(trade[i].get_pokemon);
            let tradeObj = {
                user_id: user_id,
                username: username,
                give_pokemon: give_pokemon,
                get_pokemon: get_pokemon
            }
            console.log(tradeObj);
            tradesArray.push(tradeObj);
        }
        setAvailableTrades([...tradesArray])
    }

    async function createPokemonObj(pokemon: any[]) {
        let pokemonArray = [];
        for(let i = 0; i < pokemon.length; i++) {
            let pokeId = pokemon[i];
            let pokeInfo = await axios.get(POKE_API + pokeId);
            let pokeObj = {
                id: pokeId,
                name: pokeInfo.data.species.name,
                image: pokeInfo.data.sprites.front_default
            }
            pokemonArray.push(pokeObj);
        }
        return pokemonArray;
    }
    
    return (
        <>
        <div className="tradesOuterContainer">
              <div className="tradeHeader text-center">Available Trades</div>
              <button className="btn btn-secondary" data-bs-toggle="collapse" data-bs-target="#pokemonListContainerTrades">Collapse</button>
              <div className="containerList collapse show" id='pokemonListContainerTrades'>
              <button className="tradesButton" onClick={getAvailableTrades}>See All Available Trades</button>
            <div className="pokemonList">
            {
              availableTrades.length > 0 &&
              availableTrades.map((trade, index) => {
                return (
                  <div className="tradeContainer"key={trade.user_id}>
                  <div className="tradeList" >
                    <div className="tradeUser">{trade.username} has trade options available:
                    <MessageModal username={trade.username}/>
                    </div>
                    <div className="pokemonList">
                      <div className="tradeHeaderWants">{trade.username} wants</div>
                      {
                          trade.give_pokemon.map((pokemon: any) => {
                              return (
                                <div className="pokemonCard" key={pokemon.id}>
                                  <img className="pokemonImage" src={pokemon.image} alt={pokemon.name} />
                                  <div className="pokemonId">#{("000" + pokemon.id).slice(-4)}</div>
                                  <div className="pokemonName"><h5>{pokemon.name}</h5></div>
                                </div>
                                )
                          })
                      }
                      </div>
                      <div className="pokemonList">
                      <div className="tradeHeaderHas">{trade.username} has</div>
                      {
                          trade.get_pokemon.map((pokemon: any) => {
                              return (
                                <div className="pokemonCard" key={pokemon.id}>
                                  <img className="pokemonImage" src={pokemon.image} alt={pokemon.name} />
                                  <div className="pokemonId">#{("000" + pokemon.id).slice(-4)}</div>
                                  <div className="pokemonName"><h5>{pokemon.name}</h5></div>
                                </div>
                                )
                          })
                      }
                    </div>
                  </div>
                  </div>
                )
              })
            
          }
            </div>
            </div>
          </div>  
        </>
  )
}

export default AvailableTrades