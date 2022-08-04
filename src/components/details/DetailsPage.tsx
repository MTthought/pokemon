import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as detailsActions from "../../redux/actions/detailsActions";
import { bindActionCreators } from "redux";
import { useEffect } from "react";
import Header from "../common/Header";
import { LocalStorage, SinglePokemon, Status } from "../../Types";

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
  }, []);
  console.log(details);

  return details ? (
    <>
      <Header />
      <div className="Container">
        <div>
          <Link to="/">
            <button>back</button>
          </Link>
        </div>
        <div>
          <h2>Details {name}</h2>
          <p>
            This app uses React, Redux, React Router, and many other helpful
            libraries.
          </p>
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
