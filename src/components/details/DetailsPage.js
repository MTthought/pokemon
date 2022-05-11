import { useParams } from "react-router-dom";

const DetailsPage = () => {
  let params = useParams();
  return (
    <div>
      <h2>Details {params.name}</h2>
      <p>
        This app uses React, Redux, React Router, and many other helpful
        libraries.
      </p>
    </div>
  );
};

export default DetailsPage;
