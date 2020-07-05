import { all, call, put, takeLatest } from 'redux-saga/effects';

import POKE_API from '../../services/poke_api';
import {
  FETCH_POKEMON_REQUEST,
  fetchPokemonSuccess,
  fetchPokemonFail,
} from '../ducks/pokemon';

export function* fetchPokemon(action) {
  const { pagination } = action;

  const { limit, offset } = pagination;

  try {
    const response = yield call(
      POKE_API.get,
      `pokemon?offset=${offset}&limit=${limit}`
    );

    if (response && response.status === 200) {
      yield put(fetchPokemonSuccess(response));
    }
  } catch (error) {
    yield put(fetchPokemonFail(error.response || error));
  }
}

export default all([takeLatest(FETCH_POKEMON_REQUEST, fetchPokemon)]);
