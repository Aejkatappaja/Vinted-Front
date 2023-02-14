import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OfferCard from "../components/OfferCard";

const Home = ({ search, token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p>Loading . . . </p>
  ) : (
    <div>
      <section className="main">
        <div className="firstPart">
          <h1>
            Prêts à faire <br /> du tri dans vos
            <br /> placards ?
          </h1>
          <div className="bottom">
            <button
              onClick={() => {
                token ? navigate("/publish") : navigate("/login");
              }}
            >
              Vends maintenant
            </button>
            <a href="/#">Découvrir comment ça marche</a>
          </div>
        </div>
      </section>
      <section className="secondPart">
        {data.offers.map((offer) => {
          return <OfferCard offerInfos={offer} key={offer._id} />;
        })}
      </section>
    </div>
  );
};

export default Home;
