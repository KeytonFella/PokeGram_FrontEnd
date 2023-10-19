import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { get } from 'http';
import { useSelector } from 'react-redux';
import { RootState } from '../../utility/reduxTypes';

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
            const give_pokemon = await createPokemonObj(trade[i].give_pokemon);
            const get_pokemon = await createPokemonObj(trade[i].get_pokemon);
            let tradeObj = {
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
        <div className="container">
            <div className="row">
              <div className="header text-center">Available Trades</div>
              <button className="button" onClick={getAvailableTrades}>See Trades</button>
            </div>
            <div className="row">
            {
              availableTrades.length > 0 &&
              availableTrades.map((trade, index) => {
                return (
                  <div className="col text-center"key={trade.username}>
                  <div className="tradeList" >
                    <h3>{trade.username}</h3>
                    <h4>Give Pokemon</h4>
                    {
                        trade.give_pokemon.map((pokemon: any) => {
                            return (
                                <div className="col text-center"key={pokemon.id}>
                                <div className="tradeList" >
                                  <h6>{pokemon.name}</h6>
                                  <img src={pokemon.image} alt="" />
                                </div>
                                </div>
                              )
                        })
                    }
                    <h4>Get Pokemon</h4>
                    {
                        trade.get_pokemon.map((pokemon: any) => {
                            return (
                                <div className="col text-center"key={pokemon.id}>
                                <div className="tradeList" >
                                  <h6>{pokemon.name}</h6>
                                  <img src={pokemon.image} alt="" />
                                </div>
                                </div>
                              )
                        })
                    }
                  </div>
                  </div>
                )
              })
            
          }

            </div>
          </div>  
        </>
  )
}

export default AvailableTrades