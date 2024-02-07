import { BaseHeader } from "./header.base";
import { TfiWorld } from "react-icons/tfi";
import { Link, useLocation } from "react-router-dom";
import "./headerhome.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import {
  changeCountry,
  changeCountryId,
} from "../../../store/Slices/countryslice/countryslice";
import { useSelector, useDispatch } from "react-redux";
import { setShow } from "../../../store/Slices/HeaderDrownDownSlice";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const HomeHeader = (props) => {
  const [countryId, setCountryId] = useState("");
  let location = useLocation();
  const country_id = useSelector((state) => state.countryReducer.countryId);
  const dispatch = useDispatch();
  const { show } = useSelector(state => state.headerDropDownReducer)

  const handleChange = (e) => {
    setCountryId(e.target.value);
    localStorage.setItem("country", e.target.value);
    dispatch(changeCountryId(e.target.value));
  };
  useEffect(() => {
    setCountryId(localStorage.getItem("country") || country_id);
    // const country = props.countries.find(
    //   (country) => (country.iso2 = countryIso)
    // );
  }, [props.countries, country_id]);
  return (
    <BaseHeader>
      {
        <div className="header-links d-flex gap-20 align-items-center ">
          <Link
            className="text-base text-white mx-4 font-medium flex items-center"
            onMouseEnter={() => dispatch(setShow(true))}
          >
            Services
            {show ?
              <ArrowDropUpIcon className="ml-2" sx={{ fontSize: 20 }} />
              :
              <ArrowDropDownIcon className="ml-2" sx={{ fontSize: 20 }} />
            }
          </Link>
          <Link
            to={"/provider/registration"}
            className="text-base text-white mx-4 font-medium"
            onMouseEnter={() => dispatch(setShow(false))}
          >
            Become a provider
          </Link>
          <Link
            to={"/blog"}
            className="text-base text-white mx-0 font-medium"
            onMouseEnter={() => dispatch(setShow(false))}
          >
            Blogs
          </Link>

          <div
            className="d-flex align-items-center gap-2 icon "
            style={{ marginLeft: "10px" }}
          >
            <i
              style={{ fontSize: "2rem", fontWeight: "800", height: "35px", color: 'white' }}
              className="d-flex align-items-center"
            >
              <span>
                <TfiWorld />
              </span>
            </i>
            <FormControl fullWidth size="small">
              <div>
                <Select
                  value={countryId}
                  onChange={handleChange}
                  style={{
                    fontSize: "2rem",
                    fontWeight: "500",
                    color: 'white'
                  }}
                  className="header-arrow !w-60"
                  sx={{
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      border: 0,
                    },
                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: 0,
                    },
                    '.MuiSvgIcon-root ': {
                      fill: "white !important",
                    },
                    width: 180,
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        "& .MuiMenuItem-root.Mui-selected": {
                          backgroundColor: "#94bceb",
                          borderRadius: "10px",
                        },
                        "& .MuiMenuItem-root:hover": {
                          backgroundColor: "#94bceb",
                          borderRadius: "10px",
                        },
                        "& .MuiMenuItem-root.Mui-selected:hover": {
                          backgroundColor: "#94bceb",
                          borderRadius: "10px",
                        },
                      },
                    },
                  }}
                >
                  {props.countries.map((country) => {
                    return (
                      <MenuItem
                        key={country.id}
                        value={country?.id}
                        style={{ fontSize: "16px", display: "flex" }}
                        component={Link}
                        to={`${country.iso2.toLowerCase()}`}
                        sx={{
                          display: "block",
                        }}
                      >
                        <div className="flex items-center">
                          <h1>
                            {country.emoji} {country.name}
                          </h1>
                        </div>
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            </FormControl>
          </div>
        </div>
      }
    </BaseHeader>
  );
};
