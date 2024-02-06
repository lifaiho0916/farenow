import { BaseHeader } from "./header.base";
import { TfiWorld } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./headerhome.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { setShow } from "../../../store/Slices/HeaderDrownDownSlice";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const HomeHeader = (props) => {
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const { show } = useSelector(state => state.headerDropDownReducer)

  const handleChange = (e) => {
    setCountry(e.target.value);
    localStorage.setItem("country", e.target.value);
  };

  useEffect(() => {
    const defaultCountry = props.countries.find(
      (country) => country.is_default === true
    );
    if (defaultCountry) {
      setCountry(defaultCountry.id);
      localStorage.setItem("country", defaultCountry.id);
    }
  }, [props.countries]);
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
            onMouseEnter={() => dispatch(setShow(false))}
          >
            <i style={{ fontSize: "2rem", fontWeight: "800", height: "35px" }} className="d-flex align-items-center text-white">
              <span>
                <TfiWorld />
              </span>
            </i>

            <FormControl fullWidth size="small" className="mobc">
              <div className="dropdown">
                <Select
                  value={country}
                  onChange={handleChange}
                  style={{
                    fontSize: "2rem",
                    fontWeight: "500",
                    color: 'white'
                  }}
                  className="header-arrow"
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
                    }
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
                        to={`${country.is_default ? "/" : country.iso2.toLowerCase()
                          }`}
                        sx={{
                          display: "block",
                        }}
                      >
                        <h1>{country.emoji} {country.name}</h1>
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            </FormControl>
          </div>
        </div >
      }
    </BaseHeader >
  );
};

