import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as detailsActions from "../../redux/actions/detailsActions";
import { bindActionCreators } from "redux";
import { useEffect } from "react";
import Header from "../common/Header";
import { LocalStorage, SinglePokemon, Status } from "../../Types";
import { capitaliseFirstLetter } from "../../helpers";
import List from "../common/List";
import BasicInfo from "../common/BasicInfo";

interface Props {
  actions: {
    setDetails: (payload: any) => void;
  };
  state: {
    status: Status;
    details: any;
  };
}

const DetailsPage = ({ actions, state }: Props) => {
  const { name } = useParams<{ name: string }>();
  const { details, status } = state;

  useEffect(() => {
    const list: LocalStorage = localStorage.getItem("list");
    if (list) {
      actions.setDetails(
        JSON.parse(list).filter(
          (singlePokemon: SinglePokemon) => singlePokemon.name === name
        )[0]
      );
    }
  }, [name, actions]);

  return details ? (
    <>
      <Header />
      <div className="Container">
        <Link to="/">
          <button>back</button>
        </Link>
        <div className="Details-layout">
          <img
            src={details.sprites.other["official-artwork"].front_default}
            alt="img"
            className="Card"
          />
          <div className="Details-layout">
            <h1>{capitaliseFirstLetter(name ?? "")}</h1>
            <div className="Card Card-content">
              <BasicInfo singlePokemon={details} />
              <List title="Type" items={details.types} property="type" />
            </div>
            <button>
              <Link to="/">Explore more Pokemon</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>{status}</p>
  );
};

function mapStateToProps(state: any) {
  return {
    state: state.details,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(detailsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
