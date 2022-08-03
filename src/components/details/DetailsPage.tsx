import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "../common/Header";
import { ReduxProps, LocalStorage, SinglePokemon } from "../../Types";

const DetailsPage = ({ actions, list }: ReduxProps) => {
  const { name } = useParams<{ name: string }>();
  const { details, status } = list;

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

export default DetailsPage;
