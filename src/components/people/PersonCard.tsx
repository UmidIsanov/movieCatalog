// PersonCard.tsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./PersonCard.css";

type PersonCardProps = {
  person: {
    id?: number;
    name?: string;
    popularity?: string;
    profile_path?: string;
  };
  currentIndex?: number;
  index?: number;
};

const PersonCard = ({ person, currentIndex, index }: PersonCardProps) => {
  const imageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/original${person.profile_path}`
    : "fallbackImageUrl";

  const personId = person.id;

  return (
    <Link to={`/person/${personId}`}>
      <div className="PersonCard">
        {person.profile_path && (
          <img src={imageUrl} alt="sas" className="cardPeopleImage" />
        )}
        <h3 className="PersonName">{person.name}</h3>
      </div>
    </Link>
  );
};

PersonCard.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    popularity: PropTypes.string,
    profile_path: PropTypes.string,
  }).isRequired,
  currentIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default PersonCard;
