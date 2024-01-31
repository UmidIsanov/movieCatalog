import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import arrowRight from "../../assets/Icons/Icon.svg";
import PersonCard from "./PersonCard";
import PersonDetails from "./PersonDetails";
import "./PopularPeople.css";

type Person = {
  id?: number;
  name?: string;
  popularity?: string;
  profile_path?: string;
};

const PopularPeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(6);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url =
        "https://api.themoviedb.org/3/person/popular?language=en-US&page=1";

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data.results);
        setPeople(data.results);
      } catch (error) {
        console.error("Error fetching popular people:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showNextCards = () => {
    setCurrentOffset((prevOffset) => (prevOffset + 1) % people.length);
  };

  const showPreviousCards = () => {
    setCurrentOffset(
      (prevOffset) => (prevOffset - 1 + people.length) % people.length
    );
  };

  if (people.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="Wrapper-title">People</h2>
      <div className="ListPopularPeople-wrapper">
        <img
          src={arrowRight}
          alt="prevImage"
          className="arrowLeft"
          onClick={showPreviousCards}
        />
        <div className="ListPopularpPeopleList" ref={listRef}>
          {Array.from({ length: visibleCards }).map((_, index) => (
            <PersonCard
              key={people[(currentOffset + index) % people.length].id}
              person={people[(currentOffset + index) % people.length]}
              currentIndex={(currentOffset + index) % people.length}
              index={index}
            />
          ))}
        </div>
        <img
          src={arrowRight}
          alt="nextMovie"
          className="arrowRight"
          onClick={showNextCards}
        />
      </div>

      {/* Добавьте маршрут для PersonDetails */}
    </div>
  );
};

export default PopularPeople;
