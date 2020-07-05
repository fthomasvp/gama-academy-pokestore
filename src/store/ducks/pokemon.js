/**
 * Action Types OR just Actions
 * */
export const FETCH_POKEMON_REQUEST = '@shopping_cart/FETCH_POKEMON_REQUEST';
export const FETCH_POKEMON_SUCCESS = '@shopping_cart/FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAIL = '@shopping_cart/FETCH_POKEMON_FAIL';

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

/**
 * Reducer
 * */
const INITIAL_STATE = {
  pokemon: [],
  pagination: {
    limit: 20,
    offset: 0,
    next: '',
    previous: '',
    count: 0,
  },
  error: null,
  response: null,
};

export const shoppingCart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POKEMON_SUCCESS: {
      const { results, next, previous, count } = action.response.data;

      return {
        ...state,
        pokemon: [...state.pokemon, results],
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

    default:
      return state;
  }
};
