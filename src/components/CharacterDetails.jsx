import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "./Navigation";

function CharacterDetails() {
  const params = useParams();
  const [characterInfo, setcharacterInfo] = useState();
  const [comentsList, setComentsList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [episodesList, setEpisodesList] = useState([]);
  const [episodesInfo, setEpisodesInfo] = useState([]);
  const episodes = [];

  useEffect(() => {
    const getCharactersInfo = async () => {
      const response = await axios({
        method: "get",
        baseURL: "https://rickandmortyapi.com/api",
        url: `/character/${params.id}`,
      });

      const characterData = response.data;
      const episodeData = response.data.episode;
      setcharacterInfo(characterData);
      setEpisodesList(episodeData);
    };
    getCharactersInfo();
  }, [params]);

  const getComents = async () => {
    const response = await axios({
      method: "get",
      baseURL: "http://localhost:8000/",
      url: `character/${characterInfo.id}/comments`,
    });
    setComentsList(response.data);
  };

  const getEpisodesInfo = async () => {
    for (const episode of episodesList) {
      const response = await axios({
        method: "get",
        url: `${episode}`,
      });
      episodes.push(response.data);
    }
    setEpisodesInfo(episodes);
  };

  useEffect(() => {
    getComents();
  }, [characterInfo]);

  useEffect(() => {
    getEpisodesInfo();
  }, [characterInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: `http://localhost:8000/character/${characterInfo.id}/comments`,
        headers: {},
        data: {
          title,
          content,
        },
      });
    } catch (err) {
      console.log(err);
    }
    setTitle("");
    setContent("");
  };

  return (
    characterInfo && (
      <>
        <Navigation />
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-4 my-5">
              <img
                src={characterInfo.image}
                alt="foto"
                className="img-fluid img-details"
              />
            </div>
            <div className="col-12 col-sm-6 col-lg-8 my-5">
              <div id="character-info">
                <h1 className="fw-bold  my-2">{characterInfo.name}</h1>
                <hr />
                <p>
                  <strong>Status:</strong> {characterInfo.status}
                </p>
                <p>
                  <strong>Gender:</strong> {characterInfo.gender}
                </p>
                <p>
                  <strong>Spicies:</strong> {characterInfo.species}
                </p>
                <p>
                  <strong>Type:</strong> {characterInfo.type}
                </p>
                <p>
                  <strong>Location:</strong> {characterInfo.location.name}
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div id="episodes">
              <h4>Episodes List</h4>
              <table className="table table-dark table-striped align-middle my-4">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Air date</th>
                  </tr>
                </thead>
                <tbody>
                  {episodesInfo &&
                    episodesInfo.map((episode) => (
                      <tr key={episode.id}>
                        <td>{episode.id}</td>
                        <td>{episode.name}</td>
                        <td>{episode.episode}</td>
                        <td>{episode.air_date}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <hr />
            <div id="coments">
              <h4>Comments: {comentsList.length}</h4>
              {comentsList &&
                comentsList.map((coment) => (
                  <div key={coment.id} className="coment-card my-2">
                    <h5>{coment.title}</h5>
                    <p>{coment.content}</p>
                  </div>
                ))}
              <hr />
              <form
                action=""
                method="post"
                className="d-flex flex-column"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Title"
                  className="my-2"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <textarea
                  name="content"
                  id="content"
                  cols="30"
                  rows="10"
                  className="my-2"
                  placeholder="Comment..."
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                ></textarea>
                <button type="submit" className="mb-5 btn-pages">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default CharacterDetails;
