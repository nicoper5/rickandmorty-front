import axios from "axios";
import { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import Navigation from "./Navigation";

function Home() {
  const [characterList, setCharacterList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalpages] = useState(0);
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");

  const handleClickNext = () => {
    setPage(page + 1);
  };

  const handleClickBack = () => {
    setPage(page - 1);
  };

  const getCharacters = async (e) => {
    const response = await axios({
      method: "get",
      baseURL: "https://rickandmortyapi.com/api",
      url: `/character/?page=${page}&status=${status}&gender=${gender}`,
    });

    setCharacterList([...response.data.results]);
    setTotalpages(response.data.info.pages);
  };

  useEffect(() => {
    getCharacters();
  }, [setCharacterList, page, status, gender]);
  return (
    <>
      <Navigation />
      {page > 0 && (
        <div className="container">
          <div className="row">
            <div
              id="filters"
              className="d-flex justify-content-evenly mt-5 align-items-center"
            >
              <div>
                <form
                  action=""
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <label htmlFor="status" className="fw-bold fs-3 mx-3 ">
                    Status{" "}
                  </label>
                  <select id="status" name="status" className="select-filter">
                    <option value="">All</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">unknown</option>
                  </select>
                </form>
              </div>
              <div>
                <form
                  action=""
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <label htmlFor="gender" className="fw-bold fs-3 mx-3">
                    Gender
                  </label>
                  <select id="gender" name="gender" className="select-filter">
                    <option value="">All</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="unknown">unknown</option>
                    <option value="genderless">Genderless</option>
                  </select>
                </form>
              </div>
            </div>

            <div id="buttons" className="d-flex justify-content-between my-3">
              {page > 1 && (
                <button onClick={handleClickBack} className=" btn-pages">
                  back
                </button>
              )}
              <span className="fs-3 ">
                <strong>Page: </strong>
                {page} of {totalPages}
              </span>

              {page < totalPages && (
                <button onClick={handleClickNext} className="btn-pages">
                  Next
                </button>
              )}
            </div>

            {characterList.map((character) => (
              <div className="col-12 col-sm-6 col-lg-3" key={character.id}>
                <CharacterCard character={character} />
              </div>
            ))}
            <div id="buttons" className="d-flex justify-content-between my-3">
              {page > 1 && (
                <button onClick={handleClickBack} className=" btn-pages">
                  back
                </button>
              )}
              <span className="fs-3 ">
                <strong>Page: </strong>
                {page} of {totalPages}
              </span>

              {page < totalPages && (
                <button onClick={handleClickNext} className="btn-pages">
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
