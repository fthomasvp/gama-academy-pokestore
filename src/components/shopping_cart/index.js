import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Badge from '@material-ui/core/Badge';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import * as PokemonReducer from '../../store/ducks/pokemon';

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const { shoppingCart, totalValue } = useSelector((state) => state.poke);

  const addItem = (item) => {
    const pokemonToAdd = {
      name: item.name.toUpperCase(),
      price: item.price,
      image: item.image,
    };

    dispatch(PokemonReducer.addPokemonToShoppingCart(pokemonToAdd));
  };

  const removeItem = (item) => {
    const pokemonToRemove = {
      name: item.name.toUpperCase(),
      price: item.price,
      image: item.image,
    };

    dispatch(PokemonReducer.removePokemonFromShoppingCart(pokemonToRemove));
  };

  return (
    <Paper>
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '15px' }}
      >
        <ShoppingCartIcon color="primary" fontSize="large" />
        <Typography color="primary" variant="h5" align="center">
          Carrinho
        </Typography>
      </div>

      <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
        {shoppingCart && shoppingCart.length > 0 ? (
          shoppingCart.map((item, index) => (
            <List key={index}>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Badge badgeContent={item.amount} color="primary">
                    <ShoppingBasketIcon color="primary" />
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  color="primary"
                  primary={item.name.toUpperCase()}
                  secondary={<b>R$ {item.price}</b>}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => removeItem(item)}
                    disabled={!item.amount}
                  >
                    <RemoveCircleOutlineIcon color="primary" fontSize="large" />
                  </IconButton>
                  <IconButton edge="end" onClick={() => addItem(item)}>
                    <AddCircleOutlineIcon color="primary" fontSize="large" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          ))
        ) : (
          <Typography color="primary" variant="button">
            O carrinho está limpo
          </Typography>
        )}
      </div>
      <div>
        <Paper>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '15px',
            }}
          >
            <div
              style={{
                display: 'flex',
              }}
            >
              <AttachMoneyIcon color="primary" fontSize="large" />
              <Typography color="primary" variant="h5">
                Total
              </Typography>
            </div>
            <div>
              <Typography color="primary" variant="h5">
                {`R$ ${totalValue}`}
              </Typography>
            </div>
          </div>
        </Paper>
      </div>
    </Paper>
  );
};

export default ShoppingCart;
