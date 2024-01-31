import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import movieDBIcon from "../../assets/moviedb_icon.png";
import SearchInput from "../SearchInput";
type PersonDetailsProps = {
  person: {
    id?: number;
    name?: string;
    popularity?: string;
    profile_path?: string;
  };
};

const PersonDetails: React.FC<PersonDetailsProps> = ({ person }) => {
  const { id } = useParams<{ id: string }>();
  const [personDetails, setPersonDetails] = useState<any | null>(null);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const url = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        };

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Failed to fetch person details: ${response.status}`);
        }

        const data = await response.json();
        setPersonDetails(data);
      } catch (error) {
        console.error("Error fetching person details:", error);
      }
    };

    if (id) {
      fetchPersonDetails();
    }
  }, [id]);

  if (!personDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="head">
        <div className="leftSection">
          <Link to="/">
            <img src={movieDBIcon} alt="MovieLogo" className="MovieLogo" />
          </Link>
        </div>
        <div className="rightSection">
          <SearchInput />
        </div>
      </div>
      <h2 className="name">{personDetails.name}</h2>
      <img
        src={`https://image.tmdb.org/t/p/original${personDetails.profile_path}`}
        alt=""
        className="Image"
      />
      <h3 className="birthday">{personDetails.birthday}</h3>
      <h4 className="place_of_birth">{personDetails.place_of_birth}</h4>
      <h2 className="biography">{personDetails.biography}</h2>
    </div>
  );
};

export default PersonDetails;
