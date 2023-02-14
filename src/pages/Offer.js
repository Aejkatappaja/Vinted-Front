import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading. . . </p>
  ) : (
    <section className="offerBck">
      <div className="mainPic">
        <img src={data.product_image.secure_url} alt="pix" />
      </div>
      <div className="informations">
        <div>
          <h1>{data.product_price} €</h1>

          {data.product_details.map((detail, index) => {
            const key = Object.keys(detail)[0];
            return (
              <div className="allInfos" key={index}>
                <p>{key} </p> <div>{detail[key]}</div>
              </div>
            );
          })}
        </div>
        <div>
          <h2> {data.product_name}</h2>
          <p> {data.product_description}</p>

          <span>{data.owner.account.username}</span>
        </div>
        <div className="button">
          <button
            onClick={() => {
              navigate("/payment", {
                state: { title: data.product_name, price: data.product_price },
              });
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </section>
  );
};

export default Offer;
