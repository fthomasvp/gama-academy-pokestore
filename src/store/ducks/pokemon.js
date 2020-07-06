/**
 * Action Types OR just Actions
 * */
export const FETCH_POKEMON_REQUEST = '@pokemon/FETCH_POKEMON_REQUEST';
export const FETCH_POKEMON_SUCCESS = '@pokemon/FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAIL = '@pokemon/FETCH_POKEMON_FAIL';

export const FETCH_NEXT_POKEMON_REQUEST = '@pokemon/FETCH_NEXT_POKEMON_REQUEST';
export const FETCH_NEXT_POKEMON_SUCCESS = '@pokemon/FETCH_NEXT_POKEMON_SUCCESS';
export const FETCH_NEXT_POKEMON_FAIL = '@pokemon/FETCH_NEXT_POKEMON_FAIL';

export const FETCH_PREVIOUS_POKEMON_REQUEST =
  '@pokemon/FETCH_PREVIOUS_POKEMON_REQUEST';
export const FETCH_PREVIOUS_POKEMON_SUCCESS =
  '@pokemon/FETCH_PREVIOUS_POKEMON_SUCCESS';
export const FETCH_PREVIOUS_POKEMON_FAIL =
  '@pokemon/FETCH_PREVIOUS_POKEMON_FAIL';

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

export const fetchNextPokemonRequest = (next) => {
  return {
    type: FETCH_NEXT_POKEMON_REQUEST,
    next,
  };
};

export const fetchNextPokemonSuccess = (response) => {
  return {
    type: FETCH_NEXT_POKEMON_SUCCESS,
    response,
  };
};

export const fetchNextPokemonFail = (error) => {
  return {
    type: FETCH_NEXT_POKEMON_FAIL,
    error,
  };
};

export const fetchPreviousPokemonRequest = (previous) => {
  return {
    type: FETCH_PREVIOUS_POKEMON_REQUEST,
    previous,
  };
};

export const fetchPreviousPokemonSuccess = (response) => {
  return {
    type: FETCH_PREVIOUS_POKEMON_SUCCESS,
    response,
  };
};

export const fetchPreviousPokemonFail = (error) => {
  return {
    type: FETCH_PREVIOUS_POKEMON_FAIL,
    error,
  };
};

/**
 * Reducer
 * */
const INITIAL_STATE = {
  pokemons: [],
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

export const pokemon = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POKEMON_SUCCESS: {
      const { results, next, previous, count } = action.response.data;

      return {
        ...state,
        pokemons: results,
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

    case FETCH_NEXT_POKEMON_SUCCESS: {
      const { results, next, previous, count } = action.response.data;

      return {
        ...state,
        pokemons: results,
        pagination: {
          ...state.pagination,
          next,
          previous: previous === null ? '' : previous,
          count,
        },
        response: action.response,
      };
    }

    case FETCH_NEXT_POKEMON_FAIL:
      return {
        ...state,
        error: action.error,
        response: null,
      };

    case FETCH_PREVIOUS_POKEMON_SUCCESS: {
      const { results, next, previous, count } = action.response.data;

      return {
        ...state,
        pokemons: results,
        pagination: {
          ...state.pagination,
          next,
          previous: previous === null ? '' : previous,
          count,
        },
        response: action.response,
      };
    }

    case FETCH_PREVIOUS_POKEMON_FAIL:
      return {
        ...state,
        error: action.error,
        response: null,
      };

    default:
      return state;
  }
};
