import { useEffect, useState, useRef } from "react";
import {
  Link,
  NavLink,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import axios from "axios";
// import ServiceType from "../../constants/ServiceType";
import { Chat } from "../Chat/Chat";
import { useSelector, useDispatch } from "react-redux";
import { getNotifications } from "../../store/Slices/notification";
import { headerMenu } from "../../store/Slices/HeaderMenuSlice";
import { pageLinks } from "../../store/Slices/footer";
import { BaseHeader } from "./header/header.base";
import { HomeHeader } from "./header/header.home";
import SearchBarHeader from "./header/header.searchbar";
import { setAllCountry } from "../../store/Slices/countryslice/allCountrySlice";

const Header = (props) => {
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
    <div className="shadow-[0_4px_8px_0_#0000000A] relative z-20">{header}</div>
  );
};

export default Header;
