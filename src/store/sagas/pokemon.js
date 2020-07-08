import { all, call, put, takeLatest } from 'redux-saga/effects';

import POKE_API from '../../services/poke_api';
import * as PokemonReducer from '../ducks/pokemon';

export function* fetchPokemon(action) {
  const { pagination } = action;

  const { limit, offset } = pagination;

  try {
    const response = yield call(
      POKE_API.get,
      `pokemon?offset=${offset}&limit=${limit}`
    );

    if (response && response.status === 200) {
      yield put(PokemonReducer.fetchPokemonSuccess(response));
      yield put(PokemonReducer.fetchPokemonDetailsRequest(response));
    }
  } catch (error) {
    yield put(PokemonReducer.fetchPokemonFail(error.response || error));
  }
}

export function* fetchPokemonDetails(action) {
  const { results } = action.responseFromFetchPokemon.data;

  const pokemonNames = results.map((pokemon) => pokemon.name);

  const axiosRequests = pokemonNames.map((name) =>
    POKE_API.get(`pokemon/${name}`)
  );

  try {
    const response = yield all(axiosRequests);

    if (response && response[0].status === 200) {
      yield put(PokemonReducer.fetchPokemonDetailsSuccess(response));
    }
  } catch (error) {
    yield put(PokemonReducer.fetchPokemonDetailsFail(error.response || error));
  }
}

export function* searchPokemon(action) {
  const { pokemonToSearch } = action;

  try {
    const response = yield call(POKE_API.get, `pokemon/${pokemonToSearch}`);

    if (response && response.status === 200) {
      yield put(PokemonReducer.searchPokemonSuccess(response));
    }
  } catch (error) {
    yield put(PokemonReducer.searchPokemonFail(error.response || error));
  }
}

export default all([
  takeLatest(PokemonReducer.FETCH_POKEMON_REQUEST, fetchPokemon),
  takeLatest(PokemonReducer.FETCH_POKEMON_DETAILS_REQUEST, fetchPokemonDetails),
  takeLatest(PokemonReducer.SEARCH_POKEMON_REQUEST, searchPokemon),
]);
