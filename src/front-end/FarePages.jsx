import React from 'react'
import { Index } from './Index'
import {GanaIndex} from './GanaIndex';
import {RawandaIndex} from './RawandaIndex';
import {SouthIndex} from './SouthIndex';
import {useSelector } from "react-redux";
import { changeCountry } from "../store/Slices/countryslice/countryslice";


const FarePages = () => {

    const { selectcountry } = useSelector((state) => state.countryReducer);
    console.log(selectcountry);

  return (
    <>

          {selectcountry === "nigeria" &&  <Index/>  }
          {selectcountry === "gana" && <GanaIndex/>}
          {selectcountry === "rawanda" && <RawandaIndex/>}
          {selectcountry === "southafrica" && <SouthIndex/>}

  
    </>
  )
}

export default FarePages