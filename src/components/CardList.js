import Card from "./Card";

const CardList = ({ pokemon }) =>
  // to do: if no search match, show something different from 'loading'
  !pokemon.length ? (
    <p>Loading...</p>
  ) : (
    <div className="Card-list">
      {pokemon.map((singlePokemon) => (
        <Card key={singlePokemon.id} singlePokemon={singlePokemon} />
      ))}
    </div>
  );

export default CardList;
