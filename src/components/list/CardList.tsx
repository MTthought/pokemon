import Card from "./Card";
import { SinglePokemon, Status } from "../../Types";

interface Props {
  pokemon: SinglePokemon[];
  status: Status;
}

const CardList = ({ pokemon, status }: Props) =>
  !pokemon.length ? (
    <p>{status}</p>
  ) : (
    <div className="Card-list">
      {pokemon.map((singlePokemon: SinglePokemon) => (
        <Card key={singlePokemon.id} singlePokemon={singlePokemon} />
      ))}
    </div>
  );

export default CardList;
