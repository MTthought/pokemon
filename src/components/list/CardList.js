import Card from "./Card";

const CardList = ({ pokemon, status }) =>
  !pokemon.length ? (
    <p>{status}</p>
  ) : (
    <div className="Card-list">
      {pokemon.map((singlePokemon) => (
        <Card key={singlePokemon.id} singlePokemon={singlePokemon} />
      ))}
    </div>
  );

export default CardList;
