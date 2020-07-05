import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import FilledInput from '@material-ui/core/FilledInput';

import ShoppingCart from '../../components/shopping_cart';
import * as PokemonReducer from '../../store/ducks/pokemon';

const Home = () => {
  const dispatch = useDispatch();

  const { pokemon, pagination, error, response } = useSelector(
    (state) => state.shoppingCart
  );

  console.log('Pokemons:', pokemon);
  console.log('Response:', response);

  /**
   * Effects
   */
  useEffect(() => {
    dispatch(PokemonReducer.fetchPokemonRequest(pagination));
  }, [dispatch, pagination]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FilledInput
            autoFocus
            fullWidth
            color="primary"
            placeholder="Pesquise um Pokemon..."
            startAdornment={
              <InputAdornment position="start">
                <IconButton aria-label="search pokemon">
                  <Search color="primary" />
                </IconButton>
              </InputAdornment>
            }
            value={''}
            margin="dense"
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <div>Content</div>

          <Grid container justify="center" item xs={12}>
            <Pagination
              count={10}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4}>
          <ShoppingCart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
