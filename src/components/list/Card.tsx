import { Link } from "react-router-dom";
import { capitaliseFirstLetter } from "../../helpers";
import { SinglePokemon } from "../../Types";

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
      <p>
        <span className="Bold-text">Height:</span> {singlePokemon.height}
      </p>
      <p>
        <span className="Bold-text">Weight:</span> {singlePokemon.weight}
      </p>
      <p className="Bold-text">Abilities:</p>
      <ul>
        {singlePokemon.abilities.map(
          (item, i) =>
            !item.is_hidden && (
              <li key={i}>{capitaliseFirstLetter(item.ability.name)}</li>
            )
        )}
      </ul>
    </div>
  </Link>
);

export default Card;
