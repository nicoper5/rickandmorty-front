import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/characterCard.css";

function CharacterCard({ character }) {
  const [comentsList, setComentsList] = useState([]);

  const getComents = async () => {
    const response = await axios({
      method: "get",
      baseURL: "http://localhost:3000/",
      url: `character/${character.id}/comments`,
    });
    setComentsList(response.data);
  };

  useEffect(() => {
    getComents();
  }, []);

  return (
    <>
      <Link to={`/character/${character.id}`} className="text-link">
        <div className=" character-card mb-2">
          <img src={character.image} alt="foto" className="img-card" />
          <div className="card-info">
            <h3 className="text-center">{character.name}</h3>
            <hr />
            <div id="character-info-card">
              <p>
                <strong>Status:</strong> {character.status}{" "}
              </p>
              <p>
                <strong>Gender:</strong> {character.gender}{" "}
              </p>
              <p>
                <strong>Spicies:</strong> {character.species}{" "}
              </p>
              <p>
                <strong>Type:</strong> {character.type}{" "}
              </p>
              <p>
                <strong>Location: </strong>
                {character.location.name}{" "}
              </p>
              <p>
                <strong>Comments: </strong>
                {comentsList.length}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CharacterCard;
