import Card from "./Card";
import { SinglePokemon, Status } from "../../Types";

interface Props {
  pokemon: SinglePokemon[];
  status: Status;
}

const CardList = ({ pokemon, status }: Props) =>
  pokemon.length ? (
    <div className="Card-list">
      {pokemon.map((singlePokemon: SinglePokemon) => (
        <Card key={singlePokemon.id} singlePokemon={singlePokemon} />
      ))}
    </div>
  ) : (
    <p>{status}</p>
  );

export default CardList;
