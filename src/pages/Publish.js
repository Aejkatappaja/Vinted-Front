import "./publish.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  return token ? (
    <section className="sell">
      <div className="titleP">
        <h1>Vends ton article</h1>
      </div>
      <form
        className="publish"
        action=""
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("condition", condition);
            formData.append("city", place);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("picture", picture);
            const response = await axios.post(
              " https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(response);
            navigate("/");
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        <div className="uploading">
          <label className="label-file" htmlFor="file">
            <div className="uploadButton"> upload picture</div>
          </label>
          <input
            id="file"
            className="input-file"
            type="file"
            onChange={(e) => {
              setPicture(e.target.files[0]);
            }}
          />
        </div>
        <div className="middleBlock">
          <div className="topDiv">
            <label htmlFor="title">
              <p>Titre </p>
            </label>{" "}
            <input
              id="title"
              value={title}
              type="text"
              placeholder="ex: Nike Dunk Panda"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="bottomDiv">
            <label htmlFor="description">
              <p>Décris ton Article </p>
            </label>
            <div className="boring">
              <input
                id="description"
                value={description}
                className="large"
                type="text"
                placeholder="ex: porté quelques fois, taille correctement..."
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="middleBlock">
          <div className="topDiv">
            <label htmlFor="brand">
              <p>Marque</p>
            </label>
            <input
              id="brand"
              value={brand}
              type="text"
              placeholder="ex: Zara"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </div>
          <div className="topDiv">
            <label htmlFor="size">
              <p>Taille</p>
            </label>
            <input
              id="size"
              value={size}
              type="text"
              placeholder="ex: L / 40 / 12"
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </div>
          <div className="topDiv">
            <label htmlFor="color">
              <p>Couleur</p>
            </label>
            <input
              id="color"
              value={color}
              type="text"
              placeholder="ex: fuschia"
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </div>
          <div className="topDiv">
            <label htmlFor="condition">
              <p>Etat</p>
            </label>
            <input
              id="condition"
              value={condition}
              type="text"
              placeholder="ex: neuf avec étiquette"
              onChange={(e) => {
                setCondition(e.target.value);
              }}
            />
          </div>
          <div className="bottomDiv">
            <label htmlFor="place">
              <p>Lieu</p>
            </label>
            <input
              id="place"
              value={place}
              className="lastOne"
              type="text"
              placeholder="ex: Paris"
              onChange={(e) => {
                setPlace(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="bottomBlock">
          <div className="bottomDiv">
            <label htmlFor="pricee">
              <p>Prix</p>
            </label>
            <input
              id="pricee"
              value={price}
              className="lastOne"
              type="text"
              placeholder="ex: 0,00 €"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="lastDiv">
            <p></p>
            <input type="checkbox" name="" id="" />
            <span>Je suis intéressé par les échanges</span>
          </div>
        </div>
        <div className="buttonEnd">
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </section>
  ) : (
    navigate("/login")
  );
};

export default Publish;
