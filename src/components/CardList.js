import Card from './Card';

const CardList = ({ pokemon }) => {
    if (!pokemon) return null;
  
    return (
      <div className="Card-list">
          {pokemon.map(singlePokemon => <Card key={singlePokemon.id} singlePokemon={singlePokemon}/>)}
      </div>
    );
  };

export default CardList;