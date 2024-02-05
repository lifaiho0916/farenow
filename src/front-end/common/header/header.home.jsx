import { BaseHeader } from "./header.base";
import { TfiWorld } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeCountry } from "../../../store/Slices/countryslice/countryslice";
import "./headerhome.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ghanaflag from "../../../styles/images/ghanaflag.png";
import nigeriaflag from "../../../styles/images/nigeriaflag.png";
import rwandaflag from "../../../styles/images/rawandaflag.png";
import southflag from "../../../styles/images/southflag.png";
import { useLocation } from "react-router-dom";

export const HomeHeader = () => {
  const dispatch = useDispatch();
  const { selectcountry } = useSelector((state) => state.countryReducer);
  console.log(selectcountry);
  const location = useLocation();
  console.log(location);
  return (
    <BaseHeader>
      {
        <div className="header-links d-flex gap-20 align-items-center ">
          <Link
            to={"#popular-services"}
            className="text-base text-dark mx-4 font-medium"
          >
            Services
          </Link>
          <Link
            to={"/provider/registration"}
            className="text-base text-dark mx-4 font-medium"
          >
            Become a provider
          </Link>
          <Link to={"/blog"} className="text-base text-dark mx-0 font-medium">
            Blogs
          </Link>

          <div
            className=" d-flex align-items-center gap-2 icon "
            style={{ marginLeft: "10px" }}
          >
            <i style={{ fontSize: "2rem", fontWeight: "800" }}>
              <span>
                <TfiWorld />
              </span>
            </i>

            <FormControl fullWidth size="small" className="mobc">
              <div className="dropdown">
                <Select
                  defaultValue={"nigeria"}
                  onChange={(e) => dispatch(changeCountry(e.target.value))}
                  style={{ fontSize: "2rem", fontWeight: "500" }}
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
                  <img
                    src={nigeriaflag}
                    style={{ width: "20px", marginLeft: "5px" }}
                  />
                  <MenuItem
                    value={"nigeria"}
                    style={{ fontSize: "16px" }}
                    component={Link}
                    to="/"
                  >
                    Nigeria
                  </MenuItem>
                  <img
                    src={ghanaflag}
                    style={{ width: "20px", marginLeft: "5px" }}
                  />
                  <MenuItem value={"gana"} style={{ fontSize: "16px" }}  component={Link}
                    to="/gh">
                    Ghana
                  </MenuItem>
                  <img
                    src={rwandaflag}
                    style={{ width: "20px", marginLeft: "5px" }}
                  />{" "}
                  <MenuItem value={"rawanda"} style={{ fontSize: "16px" }}  component={Link}
                    to="/ke">
                    Kenya
                  </MenuItem>
                  <img
                    src={southflag}
                    style={{ width: "20px", marginLeft: "5px" }}
                  />
                  <MenuItem value={"southafrica"} style={{ fontSize: "16px" }}  component={Link}
                    to="/za">
                    South Africa
                  </MenuItem>
                </Select>
              </div>
            </FormControl>
          </div>
        </div>
      }
    </BaseHeader>
  );
};

