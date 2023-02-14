import "./offerCard.css";
import { Link } from "react-router-dom";

const OfferCard = ({ offerInfos }) => {
  return (
    <Link
      to={`/offer/${offerInfos._id}`}
      style={{ textDecoration: "inherit", color: "inherit" }}
    >
      <div className="offers" key={offerInfos}>
        <div className="topTop">
          {offerInfos.owner.account.avatar && (
            <img
              className="avatar"
              src={offerInfos.owner.account.avatar.secure_url}
              alt="owner"
            />
          )}
          <h2>{offerInfos.owner.account.username}</h2>
        </div>
        <img src={offerInfos.product_image.secure_url} alt="" />

        <div>
          <p>{offerInfos.product_price} €</p>
          <p>
            {(
              offerInfos.product_price * 0.2 +
              offerInfos.product_price
            ).toFixed(1)}{" "}
            € incl.
          </p>
        </div>
        <div key={offerInfos}>
          {offerInfos.product_details.map((detail, index) => {
            if (detail.TAILLE) {
              return <p key={index}>{detail.TAILLE}</p>;
            } else if (detail.MARQUE) {
              return <p key={index}> {detail.MARQUE}</p>;
            } else {
              return null;
            }
          })}
          <p>{offerInfos.TAILLE}</p>
          <p>{offerInfos.MARQUE}</p>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
