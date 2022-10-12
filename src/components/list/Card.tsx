import { Link } from "react-router-dom";
import { capitaliseFirstLetter } from "../../helpers";
import { SinglePokemon } from "../../Types";
import BasicInfo from "../common/BasicInfo";

interface Props {
  singlePokemon: SinglePokemon;
}

const Card = ({ singlePokemon }: Props) => (
  <Link to={`${singlePokemon.name}`} className="Card">
    <img
      src={singlePokemon.sprites.other["official-artwork"].front_default}
      alt="img"
    />
    <div className="Card-content">
      <h2>{capitaliseFirstLetter(singlePokemon.name)}</h2>
      <BasicInfo singlePokemon={singlePokemon} />
    </div>
  </Link>
);

export default Card;
