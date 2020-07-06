/**
 * Action Types OR just Actions
 * */
export const FETCH_POKEMON_REQUEST = '@pokemon/FETCH_POKEMON_REQUEST';
export const FETCH_POKEMON_SUCCESS = '@pokemon/FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAIL = '@pokemon/FETCH_POKEMON_FAIL';

export const FETCH_POKEMON_DETAILS_REQUEST =
  '@pokemon/FETCH_POKEMON_DETAILS_REQUEST';
export const FETCH_POKEMON_DETAILS_SUCCESS =
  '@pokemon/FETCH_POKEMON_DETAILS_SUCCESS';
export const FETCH_POKEMON_DETAILS_FAIL = '@pokemon/FETCH_POKEMON_DETAILS_FAIL';

/**
 * Action Creators
 * */
export const fetchPokemonRequest = (pagination) => {
  return {
    type: FETCH_POKEMON_REQUEST,
    pagination,
  };
};

export const fetchPokemonSuccess = (response) => {
  return {
    type: FETCH_POKEMON_SUCCESS,
    response,
  };
};

export const fetchPokemonFail = (error) => {
  return {
    type: FETCH_POKEMON_FAIL,
    error,
  };
};

export const fetchPokemonDetailsRequest = (responseFromFetchPokemon) => {
  return {
    type: FETCH_POKEMON_DETAILS_REQUEST,
    responseFromFetchPokemon,
  };
};

export const fetchPokemonDetailsSuccess = (response) => {
  return {
    type: FETCH_POKEMON_DETAILS_SUCCESS,
    response,
  };
};

export const fetchPokemonDetailsFail = (error) => {
  return {
    type: FETCH_POKEMON_DETAILS_FAIL,
    error,
  };
};

/**
 * Reducer
 * */
const INITIAL_STATE = {
  pokemon: [],
  pagination: {
    limit: 16,
    offset: 0,
    next: '',
    previous: '',
    count: 0,
  },
  error: null,
  response: null,
};

export const poke = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POKEMON_SUCCESS: {
      const { next, previous, count } = action.response.data;

      return {
        ...state,
        pagination: {
          ...state.pagination,
          next,
          previous: previous === null ? '' : previous,
          count,
        },
        response: action.response,
      };
    }

    case FETCH_POKEMON_FAIL:
      return {
        ...state,
        error: action.error,
        response: null,
      };

    case FETCH_POKEMON_DETAILS_SUCCESS: {
      const pokemonDetails = action.response.map((responses) => responses.data);

      return {
        ...state,
        pokemon: pokemonDetails,
        error: null,
      };
    }

    default:
      return state;
  }
};
