import { useEffect, useState } from "react";
import {
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HomeHeader } from "./header/header.home";
import SearchBarHeader from "./header/header.searchbar";
import { setAllCountry } from "../../store/Slices/countryslice/allCountrySlice";
import HeaderHomePart from "./header/parts/Home";

const Header = () => {
  const location = useLocation();
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/countries`)
      .then((response) => {
        setCountries(response.data);
        dispatch(setAllCountry(response.data));
      });
  }, [dispatch]);
  const items = countries.map((item) => `/${item.iso2.toLowerCase()}`);
  const header =
    location.pathname === "/" ? (
      <HomeHeader countries={countries} />
    ) : items.includes(location.pathname) ? (
      <HomeHeader countries={countries} />
    ) : (
      <SearchBarHeader />
    );
  return (
    <div
      className="banner bg-gradient-to-tr from-[#00060E] from-70% via-[#00060E] via-90% to-[#0068E1] to-95% relative"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: 'hidden'
      }}
    >
      <div className="absolute bg-transparent md:border-2 border-solid border-[#002249] w-[430px] h-[430px] top-[-120px] left-[-80px] rounded-[100%]"></div>
      <div className="absolute bg-transparent md:border-2 border-solid border-[#002249] w-[740px] h-[740px] top-[-275px] left-[-235px] rounded-[100%]"></div>
      <div className="absolute bg-transparent md:border-2 border-solid border-[#002249] w-[1000px] h-[1000px] top-[-405px] left-[-365px] rounded-[100%]"></div>
      <div className="absolute bg-[#002046] w-[250px] h-[450px] opacity-25 rounded-[20px] rotate-45 bottom-[-150px] left-[-80px]"></div>
      <div className="absolute bg-[#003573] w-[250px] h-[450px] opacity-25 rounded-[20px] rotate-45 top-[-150px] right-[-80px]"></div>
      <div className="relative z-20">
        {header}
      </div>
      {location.pathname === "/" ?
        <HeaderHomePart />
        : null}
    </div>
  );
};

export default Header;
