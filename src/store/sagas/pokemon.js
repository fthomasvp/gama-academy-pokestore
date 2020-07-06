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
    }
  } catch (error) {
    yield put(PokemonReducer.fetchPokemonFail(error.response || error));
  }
}

export function* fetchNextPokemon(action) {
  const { pagination } = action;

  // String that contains the next data to be fetched from API
  const { next } = pagination;

  try {
    const response = yield call(POKE_API.get, next);

    if (response && response.status === 200) {
      yield put(PokemonReducer.fetchNextPokemonSuccess(response));
    }
  } catch (error) {
    yield put(PokemonReducer.fetchNextPokemonFail(error.response || error));
  }
}

export function* fetchPreviousPokemon(action) {
  const { pagination } = action;

  const { previous } = pagination;

  try {
    const response = yield call(POKE_API.get, previous);

    if (response && response.status === 200) {
      yield put(PokemonReducer.fetchPreviousPokemonSuccess(response));
    }
  } catch (error) {
    yield put(PokemonReducer.fetchPreviousPokemonFail(error.response || error));
  }
}

export default all([
  takeLatest(PokemonReducer.FETCH_POKEMON_REQUEST, fetchPokemon),
  takeLatest(PokemonReducer.FETCH_NEXT_POKEMON_REQUEST, fetchNextPokemon),
  takeLatest(
    PokemonReducer.FETCH_PREVIOUS_POKEMON_REQUEST,
    fetchPreviousPokemon
  ),
]);
