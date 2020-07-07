import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './styles';
import * as PokemonReducer from '../../store/ducks/pokemon';

const PokemonList = ({ aPokemon }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { shoppingCart } = useSelector((state) => state.poke);

  const addPokemonToShoppingCart = () => {
    const pokemonToAdd = {
      name: aPokemon.name.toUpperCase(),
      price: aPokemon.order,
      image: aPokemon.sprites.front_default,
    };

    dispatch(PokemonReducer.addPokemonToShoppingCart(pokemonToAdd));
  };

  return (
    <Card
      className={classes.root}
      style={{ marginLeft: '10px', marginBottom: '15px' }}
    >
      <CardActionArea>
        <CardMedia
          image={aPokemon.sprites.front_default}
          title={aPokemon.name.toUpperCase()}
          style={{ height: '100px' }}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {aPokemon.name.toUpperCase()}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions style={{ justifyContent: 'space-between' }}>
        <Button size="medium" color="primary" variant="outlined">
          Saiba mais
        </Button>
        <IconButton
          onClick={addPokemonToShoppingCart}
          disabled={Boolean(
            shoppingCart &&
              shoppingCart.find(
                (item) => item.name === aPokemon.name.toUpperCase()
              )
          )}
        >
          {shoppingCart &&
          shoppingCart.find(
            (item) => item.name === aPokemon.name.toUpperCase()
          ) ? (
            <CheckCircleIcon color="primary" fontSize="large" />
          ) : (
            <AddShoppingCartIcon color="primary" fontSize="large" />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

PokemonList.propTypes = {
  aPokemon: PropTypes.object.isRequired,
};

export default PokemonList;
