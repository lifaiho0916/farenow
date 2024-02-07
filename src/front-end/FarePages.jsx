import React from "react";
import { Index } from "./Index";
import { GanaIndex } from "./GanaIndex";
import { RawandaIndex } from "./RawandaIndex";
import { SouthIndex } from "./SouthIndex";
import { useSelector } from "react-redux";

const FarePages = () => {
  const country = useSelector((state) => state.countryReducer.currentCountry);

  const renderPage = () => {
    switch(country) {
      case 'ng': return <Index />;
      case 'gh': return <GanaIndex />;
      case 'ke': return <RawandaIndex />;
      case 'za': return <SouthIndex />;

      default: return <Index />;
    }
  }

  return (
    <>
      { renderPage() }
    </>
  );
};

export default FarePages;
