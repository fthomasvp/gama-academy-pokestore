import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import RefreshIcon from '@material-ui/icons/Refresh';
import Pagination from '@material-ui/lab/Pagination';
import FilledInput from '@material-ui/core/FilledInput';

import ShoppingCart from '../../components/shopping_cart';
import PokemonList from '../../components/pokemon_list';
import Alert from '../../components/alert';
import * as PokemonReducer from '../../store/ducks/pokemon';

const Home = () => {
  const dispatch = useDispatch();

  const { pokemon, pagination } = useSelector((state) => state.poke);

  const [pokemonToSearch, setPokemonToSearch] = useState('');

  const handleChangePagination = (event, page) => {
    const offset = pagination.limit * (page - 1);

    const newPagination = pagination;
    newPagination.offset = offset;

    dispatch(PokemonReducer.fetchPokemonRequest(pagination));
    dispatch(PokemonReducer.updateActualPage(page));
  };

  const handleChangePokemonSearch = (event) => {
    setPokemonToSearch(event.target.value);
  };

  const handleKeyPokemonSearch = (event) => {
    if (pokemonToSearch && event.key === 'Enter') {
      dispatch(PokemonReducer.searchPokemonRequest(pokemonToSearch));
    }
    return;
  };

  const searchPokemon = () => {
    dispatch(PokemonReducer.searchPokemonRequest(pokemonToSearch));
  };

  const clearSearchText = () => {
    setPokemonToSearch('');

    dispatch(PokemonReducer.fetchPokemonRequest(pagination));
  };

  /**
   * Alert
   */
  const error = useSelector((state) => state.poke.error);
  const response = useSelector((state) => state.poke.response);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [growTransition, setGrowTransition] = useState(false);
  const [severity, setSeverity] = useState('error');

  const handleCloseAlert = () => {
    setAlertMessage('');
    setOpenAlert(false);
    setGrowTransition(false);

    dispatch(PokemonReducer.clearSnackbar());
  };

  /**
   * Effects
   */
  useEffect(() => {
    dispatch(PokemonReducer.fetchPokemonRequest(pagination));
  }, []);

  useEffect(() => {
    if (error && error.status !== 200) {
      setAlertMessage(
        error.data?.message || error.message || 'Pokemon não encontrado'
      );
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('error');
    }
  }, [error, response, dispatch]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FilledInput
            autoFocus
            fullWidth
            color="primary"
            placeholder="Pesquise por um Pokémon. Por exemplo: pikachu"
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="clear search text pokemon"
                  onClick={clearSearchText}
                  style={{ visibility: pokemonToSearch ? 'visible' : 'hidden' }}
                >
                  <ClearIcon color="primary" />
                </IconButton>

                <IconButton
                  aria-label="search pokemon"
                  onClick={searchPokemon}
                  disabled={pokemonToSearch.length === 0}
                >
                  <Search color="primary" />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="fetch pokemon"
                  onClick={clearSearchText}
                >
                  <RefreshIcon color="primary" />
                </IconButton>
              </InputAdornment>
            }
            onChange={handleChangePokemonSearch}
            onKeyPress={handleKeyPokemonSearch}
            value={pokemonToSearch}
            margin="dense"
          />
        </Grid>

        <Grid item xs={12} sm={9}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {pokemon &&
              pokemon.length > 0 &&
              pokemon.map((aPokemon, index) => (
                <PokemonList key={index} aPokemon={aPokemon} />
              ))}
          </div>

          <Grid
            container
            justify="center"
            item
            xs={12}
            style={{ marginTop: '20px' }}
          >
            <Pagination
              count={Number.parseInt(pagination.count / pagination.limit) || 0}
              page={pagination.actualPage}
              color="primary"
              variant="outlined"
              shape="rounded"
              onChange={handleChangePagination}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={3}>
          <ShoppingCart />
        </Grid>
      </Grid>

      <Alert
        open={openAlert}
        handleClose={handleCloseAlert}
        growTransition={growTransition}
        message={alertMessage}
        severity={severity}
      />
    </Container>
  );
};

export default Home;
