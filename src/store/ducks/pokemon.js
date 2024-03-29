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

export const ADD_POKEMON_TO_SHOPPING_CART =
  '@pokemon/ADD_POKEMON_TO_SHOPPING_CART';

export const REMOVE_POKEMON_FROM_SHOPPING_CART =
  '@pokemon/REMOVE_POKEMON_FROM_SHOPPING_CART';

export const UDPATE_ACTUAL_PAGE = '@pokemon/UDPATE_ACTUAL_PAGE';

export const CLEAR_SHOPPING_CART = '@pokemon/CLEAR_SHOPPING_CART';

export const SEARCH_POKEMON_REQUEST = '@pokemon/SEARCH_POKEMON_REQUEST';
export const SEARCH_POKEMON_SUCCESS = '@pokemon/SEARCH_POKEMON_SUCCESS';
export const SEARCH_POKEMON_FAIL = '@pokemon/SEARCH_POKEMON_FAIL';

export const CLEAR_SNACKBAR = '@pokemon/CLEAR_SNACKBAR';

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

export const addPokemonToShoppingCart = (pokemon) => {
  return {
    type: ADD_POKEMON_TO_SHOPPING_CART,
    pokemon,
  };
};

export const removePokemonFromShoppingCart = (pokemon) => {
  return {
    type: REMOVE_POKEMON_FROM_SHOPPING_CART,
    pokemon,
  };
};

export const updateActualPage = (page) => {
  return {
    type: UDPATE_ACTUAL_PAGE,
    page,
  };
};

export const clearShoppingCart = () => {
  return {
    type: CLEAR_SHOPPING_CART,
  };
};

export const searchPokemonRequest = (pokemonToSearch) => {
  return {
    type: SEARCH_POKEMON_REQUEST,
    pokemonToSearch,
  };
};

export const searchPokemonSuccess = (response) => {
  return {
    type: SEARCH_POKEMON_SUCCESS,
    response,
  };
};

export const searchPokemonFail = (error) => {
  return {
    type: SEARCH_POKEMON_FAIL,
    error,
  };
};

export const clearSnackbar = () => {
  return {
    type: CLEAR_SNACKBAR,
  };
};

/**
 * Reducer
 * */
const INITIAL_STATE = {
  pokemon: [],
  shoppingCart: [],
  totalValue: 0,
  pagination: {
    limit: 20,
    offset: 0,
    actualPage: 1,
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
        error: INITIAL_STATE.error,
      };
    }

    case FETCH_POKEMON_FAIL:
      return {
        ...state,
        error: action.error,
        response: INITIAL_STATE.response,
      };

    case FETCH_POKEMON_DETAILS_SUCCESS: {
      const pokemonDetails = action.response.map((responses) => responses.data);

      return {
        ...state,
        pokemon: pokemonDetails,
        error: INITIAL_STATE.error,
      };
    }

    case ADD_POKEMON_TO_SHOPPING_CART: {
      const pokemon = action.pokemon;

      const isPokemonStored = state.shoppingCart.find(
        (item) => item.name === pokemon.name
      );

      let newShoppingCart = [];

      if (isPokemonStored) {
        newShoppingCart = state.shoppingCart.map((item) => {
          if (item.name === pokemon.name) {
            item.amount = item.amount + 1;
          }

          return item;
        });
      } else {
        pokemon.amount = 1;

        newShoppingCart = [...state.shoppingCart, pokemon];
      }

      return {
        ...state,
        shoppingCart: newShoppingCart,
        totalValue: state.totalValue + pokemon.price,
      };
    }

    case REMOVE_POKEMON_FROM_SHOPPING_CART: {
      const pokemon = action.pokemon;

      const isPokemonStored = state.shoppingCart.find(
        (item) => item.name === pokemon.name
      );

      let newShoppingCart = [];

      if (isPokemonStored.amount > 1) {
        newShoppingCart = state.shoppingCart.map((item) => {
          if (item.name === pokemon.name) {
            item.amount = item.amount - 1;
          }

          return item;
        });
      } else {
        newShoppingCart = state.shoppingCart.filter(
          (item) => item.name !== pokemon.name
        );
      }

      return {
        ...state,
        shoppingCart: newShoppingCart,
        totalValue: state.totalValue - pokemon.price,
      };
    }

    case UDPATE_ACTUAL_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          actualPage: action.page,
        },
      };

    case CLEAR_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: INITIAL_STATE.shoppingCart,
        totalValue: INITIAL_STATE.totalValue,
      };

    case SEARCH_POKEMON_SUCCESS: {
      const pokemon = action.response.data;

      return {
        ...state,
        pokemon: [pokemon],
        response: action.response,
        error: INITIAL_STATE.error,
      };
    }

    case SEARCH_POKEMON_FAIL:
      return {
        ...state,
        error: action.error,
        response: INITIAL_STATE.response,
      };

    case CLEAR_SNACKBAR:
      return {
        ...state,
        error: INITIAL_STATE.response,
        response: INITIAL_STATE.response,
      };

    default:
      return state;
  }
};
