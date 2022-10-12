import { SinglePokemon } from "../../Types";
import List from "./List";

interface Props {
  singlePokemon: SinglePokemon;
}

const BasicInfo = ({ singlePokemon }: Props) => (
  <>
    <p>
      <span className="Bold-text">Height:</span> {singlePokemon.height}
    </p>
    <p>
      <span className="Bold-text">Weight:</span> {singlePokemon.weight}
    </p>
    <List
      title="Abilities"
      items={singlePokemon.abilities}
      property="ability"
    />
  </>
);

export default BasicInfo;
