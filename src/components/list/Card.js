const Card = ({ singlePokemon }) => (
    <div className="Card">
        <img src={singlePokemon.sprites.other["official-artwork"].front_default} alt="img"/>
        <div className="Card-content">
            <h2>{singlePokemon.name}</h2>
            <p>
                <span className="Bold-text">Height:</span> {singlePokemon.height}
            </p>
            <p>
                <span className="Bold-text">Weight:</span> {singlePokemon.weight}
            </p>
            <p className="Bold-text">Abilities:</p>
            <ul>
                {singlePokemon.abilities.map((item, i) => <li key={i}>{item.ability.name}</li>)}
            </ul>
        </div>
    </div>
);

export default Card;