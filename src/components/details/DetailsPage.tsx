import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "../common/Header";
import { ReduxProps } from "../../Types";

const DetailsPage = ({ actions, list }: ReduxProps) => {
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    actions.setDetails(
      list.processedList.filter(
        (singlePokemon) => singlePokemon.name === name
      )[0]
    );
  }, []);

  const { details, status } = list;
  console.log(details); // to do: reloading erases data

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
