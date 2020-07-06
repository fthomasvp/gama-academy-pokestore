import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './styles';

const PokemonList = ({ aPokemon }) => {
  const classes = useStyles();

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
          <Typography variant="body2" color="textSecondary" component="p">
            Alguma descrição relevante do Pokémon
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions style={{ justifyContent: 'space-between' }}>
        <Button size="medium" color="primary">
          Saiba mais
        </Button>
        <IconButton>
          <AddShoppingCartIcon color="primary" fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PokemonList;
