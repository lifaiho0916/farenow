import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useModal } from "react-hooks-use-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { APP_STORE, GOOGLE_PLAY, HOST } from "../../constants";
import { getPages } from "./../../store/Slices/footer/index";
import DownloadDialog from "./download.dialog";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ghanaflag from "../../styles/images/ghanaflag.png";
import nigeriaflag from "../../styles/images/nigeriaflag.png";
import rwandaflag from "../../styles/images/rawandaflag.png";
import southflag from "../../styles/images/southflag.png";
import subtractTop from "../../assets/subtract-top.png";
import subtractBottom from "../../assets/subtract-bottom.png";
import { changeCountryId } from "../../store/Slices/countryslice/countryslice";
import { TfiWorld } from "react-icons/tfi";
import "./header/footer.css";
let myPages = {
  Articles: {
    name: "Articles",
    url: "articles",
  },
  Policy: {
    name: "Privacy Policy",
    url: "privacy-policy",
  },
  "Terms And Condition": {
    name: "Terms of Use",
    url: "terms-conditions",
  },
  About: {
    name: "About Us",
    url: "about-us",
  },
  Contact: {
    name: "Contact Us",
    url: "contact-us",
  },
};
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Footer = (props) => {
  const [state, setState] = useState({
    links: [],
    modal: null,
    total: false,
  });

  const location = useLocation();
  const dispatch = useDispatch();

  const defaultCountryId = useSelector(
    (state) => state.countryReducer.countryId
  );
  const [countryId, setCountryId] = useState(localStorage.getItem("country"));

  const ref = useRef(null);
  const emailRef = useRef(null);

  const year = new Date().getFullYear();

  const getLinks = useSelector((state) => state?.footerReducer?.pageLinks);
  const pages = useSelector((state) => state?.footerReducer?.pages);
  const headerMenu = useSelector((state) => state?.headerMenuReducer);
  const allCountry = useSelector((state) => state?.allCountryReducer);
  const country_id = useSelector((state) => state.countryReducer.countryId);
  const countryReducer = useSelector((state) => state.countryReducer);

  const [DownloadModal, openDownload] = useModal("root");
  const downloadType = useRef("APP_STORE");
  let allPages = [];
  for (let index = 0; index < pages?.data?.length; index++) {
    const element = pages.data[index];
    const newElement = {
      ...element,
      slug: element?.name.toLowerCase().replace(/\s+/g, "-"),
    };
    allPages.push(newElement);
  }
  const handleChange = (e) => {
    setCountryId(e.target.value);
    localStorage.setItem("country", e.target.value);
    dispatch(changeCountryId(e.target.value));
  };

  const country = useSelector((state) => state.countryReducer.countryId);

  useEffect(() => {
    dispatch(getPages(country));
  }, [dispatch, country]);

  useEffect(() => {
    if (getLinks?.length > 0) {
      setState({
        links: getLinks,
      });
    }
  }, [getLinks]);

  useEffect(() => {
    setCountryId(defaultCountryId);
  }, [defaultCountryId]);

  const countryIso2 = allCountry.countries
    ?.find((item) => item.id == country_id)
    ?.iso2?.toLowerCase();
  console.log(countryIso2, "ISO");
  const FooterServices = () => {
    let sub_services = [];
    headerMenu?.forEach((service) =>
      service?.sub_services?.forEach((sub_service, index) => {
        if (sub_service.show_in_the_footer === 0) {
          return;
        }
        sub_services = [
          ...sub_services,
          { ...sub_service, service: service.name },
        ];
      })
    );
    console.log(sub_services, "All sub service");
    return sub_services.map(
      (sub_service, index) =>
        !!(index % 2 === 0) && (
          <tr className="show-all" key={index}>
            <td
              className="col-6"
              key={`${sub_service.service_id}_${sub_service.id}`}
            >
              <Link
                to={
                  sub_service.view_type === "standard"
                    ? `/${countryIso2}/${sub_service?.service
                      ?.replace(" ", "-")
                      .toLowerCase()}/${sub_service.name
                        ?.replace(/[' ']/g, "-")
                        ?.replace("/", "-")
                        .toLowerCase()}`
                    : `/service-providers?subService=${sub_service.id}&zipCode=${countryReducer.zipCode}&place_id=${countryReducer.placeId}&country_id=${countryReducer.countryId}`
                }
                className="link"
                onClick={() => {
                  ref.current?.click();
                }}
              >
                {sub_service.name}
              </Link>
            </td>
            {!!sub_services[index + 1] && (
              <td
                className="col-6"
                key={`${sub_services[index + 1].service_id}_${sub_services[index + 1].id
                  }`}
              >
                <Link
                  // to={`/services/search?subService=${
                  //   sub_services[index + 1].id
                  // }`}
                  to={
                    sub_service.view_type === "standard"
                      ? `/${countryIso2}/${sub_service?.service
                        ?.replace(" ", "-")
                        .toLowerCase()}/${sub_service.name
                          ?.replace(/[' ']/g, "-")
                          ?.replace("/", "-")
                          .toLowerCase()}`
                      : `/service-providers?subService=${sub_service.id}&zipCode=${countryReducer.zipCode}&place_id=${countryReducer.placeId}&country_id=${countryReducer.countryId}`
                  }
                  className="link"
                  onClick={() => {
                    ref.current?.click();
                  }}
                >
                  {sub_services[index + 1].name}
                </Link>
              </td>
            )}
          </tr>
        )
    );
  };

  const FooterOtherLinks = () => {
    if (state.modal?.type === "all") {
      const otherLinks = state?.links?.filter(
        (link) => link.type == null && link.is_blog == false
      );
      return otherLinks.map(
        (link, index) =>
          !!(index % 2 == 0) && (
            <tr className="show-all" key={index}>
              <td>
                <a
                  href={link?.url}
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link?.name || link?.page}
                </a>
              </td>
              {otherLinks[index + 1] && (
                <td>
                  <a
                    href={otherLinks[index + 1]?.url}
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {otherLinks[index + 1]?.name || otherLinks[index + 1]?.page}
                  </a>
                </td>
              )}
            </tr>
          )
      );
    }
    if (state?.modal?.type === "blog") {
      const blogLinks = state?.links?.filter((link) => link?.is_blog);
      return blogLinks.map(
        (link, index) =>
          !!(index % 2 === 0) && (
            <tr className="show-all" key={index}>
              <td>
                <a
                  href={link?.url}
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link?.name || link?.page}
                </a>
              </td>
              {blogLinks[index + 1] && (
                <td>
                  <a
                    href={blogLinks[index + 1]?.url}
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {blogLinks[index + 1]?.name || blogLinks[index + 1]?.page}
                  </a>
                </td>
              )}
            </tr>
          )
      );
    }
    return <></>;
  };

  const openDownloadDialog = (type) => {
    downloadType.current = type;
    openDownload();
  };
  const subscribe = async () => {
    const email = emailRef.current?.value;
    if (!validateEmail(email)) {
      toast.error("Please enter valid email.");
    } else {
      try {
        await axios({
          method: "post",
          data: { email: email },
          url: `${HOST}/api/subscribers`,
        });
        toast.success("Subscription succeed.");
      } catch (e) {
        toast.error("Subscription failed.");
      }
    }
  };

  return (
    <>
      <DownloadModal>
        <DownloadDialog type={downloadType.current} />
      </DownloadModal>
      <footer className="footer-sec2 bg-[#001329] mt-10 relative pb-0">
        <img src={subtractTop} className="absolute top-0 left-0" />
        <img src={subtractBottom} className="absolute bottom-0 right-0" />
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-12">
                  <Link
                    to={(location) => ({
                      ...location,
                      pathname: "/",
                      hash: "",
                    })}
                    onClick={(e) => {
                      if (location?.pathname == "/") {
                        e.preventDefault();
                      }
                    }}
                  >
                    <img
                      src="/assets/img/brand-secondary.svg"
                      className="img-fluid"
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <div className="justify-content-between flex-col items-center">
                    <div className="footer-about text-center text-md-left my-5">
                      <p className="text-white">
                        Connect with us on social media - Be part of our budding
                        community and share your experience. Get the latest updates
                        for all our services.
                      </p>
                    </div>

                    <div className="footer-social-link">
                      <h1 className="text-xl text-white mb-4 font-bold">
                        Stay Connected
                      </h1>
                      <ul className="social d-flex justify-start items-center">
                        {state?.links?.map((link) => {
                          if (link.type != null) {
                            if (link.type == "FACEBOOK") {
                              return (
                                <li
                                  className="item mr-4 bg-[#7AB8FF66]"
                                  key={link.id}
                                >
                                  <a href={link.url} target="_blank" rel="noreferrer">
                                    <img
                                      src="/assets/img/facebook.png"
                                      className="img-fluid"
                                      alt="socail"
                                    />
                                  </a>
                                </li>
                              );
                            }
                            if (link.type == "INSTAGRAM") {
                              return (
                                <li
                                  className="item mr-4 bg-[#7AB8FF66]"
                                  key={link.id}
                                >
                                  <a href={link.url} target="_blank" rel="noreferrer">
                                    <img
                                      src="/assets/img/instagram.png"
                                      className="img-fluid"
                                      alt="socail"
                                    />
                                  </a>
                                </li>
                              );
                            }
                            if (link.type == "TWITTER") {
                              return (
                                <li
                                  className="item mr-4 bg-[#7AB8FF66]"
                                  key={link.id}
                                >
                                  <a href={link.url} target="_blank" rel="noreferrer">
                                    <img
                                      src="/assets/img/twitter.png"
                                      className="img-fluid"
                                      alt="socail"
                                    />
                                  </a>
                                </li>
                              );
                            }
                            if (link.type === "WHATS_APP") {
                              return (
                                <li className="item twitter mr-4" key={link.id}>
                                  <a href={link.url} target="_blank" rel="noreferrer">
                                    <img
                                      src="/assets/img/twitter.png"
                                      className="img-fluid"
                                      alt="socail"
                                    />
                                  </a>
                                </li>
                              );
                            }
                          }
                        })}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 icon footer-country mt-5">
                      <i style={{ fontSize: "2rem", fontWeight: "800" }}>
                        <span>
                          <TfiWorld />
                        </span>
                      </i>
                      <FormControl fullWidth size="small" className="mobc">
                        <div className="dropdown">
                          <Select
                            value={countryId}
                            onChange={handleChange}
                            style={{ fontSize: "2rem", fontWeight: "500" }}
                            className="header-arrow !w-full"
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
                            {allCountry?.countries?.map((country) => {
                              return (
                                <MenuItem
                                  key={country.id}
                                  value={country?.id}
                                  style={{ fontSize: "16px", display: "flex !important" }}
                                  component={Link}
                                  to={`${country.is_default ? "/" : country.iso2.toLowerCase()
                                    }`}
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
                </div>
                <div className="col-md-5">
                  <ul className="footer-link my-5">
                    <div className="font-bold text-2xl text-white">POPULAR SERVICES</div>
                    {(() => {
                      let total = 0;
                      return headerMenu?.map((service) =>
                        service?.sub_services?.map((sub_service) => {
                          console.log(sub_service.view_type);
                          if (sub_service.show_in_the_footer === 0) {
                            return;
                          }
                          if (total < 8 && total != null) {
                            total++;
                            return (
                              <li
                                className="item"
                                key={`${service.id}_${sub_service.id}`}
                              >
                                <Link
                                  to={
                                    sub_service.view_type === "standard"
                                      ? `/${countryIso2}/${service.name
                                        .replace(" ", "-")
                                        .toLowerCase()}/${sub_service.name
                                          .replace(/[' ']/g, "-")
                                          .replace("/", "-")
                                          .toLowerCase()}`
                                      : `/service-providers?subService=${sub_service.id}&zipCode=${countryReducer.zipCode}&place_id=${countryReducer.placeId}&country_id=${countryReducer.countryId}`
                                  }
                                  className="link text-white"
                                >
                                  {sub_service.name}
                                </Link>
                              </li>
                            );
                          } else if (total == 8 && total != null) {
                            total = null;
                            return (
                              <li
                                className="item"
                                key={`${service.id}_${sub_service.id}`}
                              >
                                <span
                                  className="link"
                                  role="button"
                                  data-backdrop="static"
                                  data-keyboard="false"
                                  data-toggle="modal"
                                  data-target="#details"
                                  onClick={() =>
                                    setState({
                                      ...state,
                                      modal: {
                                        title: "All Services",
                                        type: "services",
                                      },
                                    })
                                  }
                                >
                                  See all Services
                                </span>
                              </li>
                            );
                          }
                        })
                      );
                    })()}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="row justify-center">
                <div className="flex gap-6">
                  <button
                    className="fare-btn bg-gray-50 hover:bg-primary-light border-primary border-b-2 text-primary-main text-[14px] w-[220px] px-12"
                    onClick={() => {
                      openDownloadDialog("APP_STORE");
                    }}
                  >
                    <img
                      src="/assets/img/app-store-logo.svg"
                      className="float-left mx-2"
                      alt=""
                    />
                    Download on the <br />{" "}
                    <span className="font-bold text-sm">App Store</span>
                  </button>
                  <button
                    className="fare-btn bg-gray-50 hover:bg-primary-light border-primary border-b-2 text-primary-main text-[14px] w-[220px] px-12"
                    onClick={() => {
                      openDownloadDialog("GOOGLE_PLAY");
                    }}
                  >
                    <img
                      src="/assets/img/google-play-logo.svg"
                      className="float-left mx-2"
                    />
                    Available on the <br />{" "}
                    <span className="font-bold text-sm">Google Play</span>
                  </button>
                </div>
              </div>
              <div className="row mt-5 pt-2 sm:pt-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-center md:justify-center">
                    <ul className="footer-link">
                      <div className="font-bold text-2xl text-white">PAGES</div>
                      <li className="item">
                        <Link to={"/blog"} className="link text-white">
                          Blog
                        </Link>
                      </li>
                      {/* <li className="item">
                    <Link to={"/about"} className="link">
                      About Us
                    </Link>
                  </li>
                  <li className="item">
                    <Link to={"/contact"} className="link">
                      Contact Us
                    </Link>
                  </li> */}
                      <li className="item">
                        <Link to={"/register"} className="link text-white">
                          Sign Up
                        </Link>
                      </li>
                      <li className="item">
                        <Link to={"/provider/registration"} className="link text-white">
                          Become a Pro
                        </Link>
                      </li>
                      <li className="item">
                        <Link className="link text-white" to="/help">
                          Help
                        </Link>
                      </li>
                      <li className="item">
                        <Link className="link text-white" to="/faq">
                          FAQ
                        </Link>
                      </li>
                      {state?.links?.map((link) => {
                        let countLink = 0;
                        if (
                          link.type == null &&
                          link.is_blog === false &&
                          countLink < 8
                        ) {
                          countLink = countLink + 1;
                          return (
                            <li className="item" key={link?.id}>
                              <a
                                href={link?.url}
                                className="link"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {link?.name || link?.page}
                              </a>
                            </li>
                          );
                        }
                      })}
                      {state?.links?.filter(
                        (link) => link.type == null && link.is_blog === false
                      ).length >= 8 && (
                          <li className="item">
                            <span
                              role="button"
                              className="link"
                              data-backdrop="static"
                              data-keyboard="false"
                              data-toggle="modal"
                              data-target="#details"
                              onClick={() =>
                                setState({
                                  ...state,
                                  modal: {
                                    title: "Pages",
                                    type: "all",
                                  },
                                })
                              }
                            >
                              See all pages
                            </span>
                          </li>
                        )}
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center md:justify-center">
                    <ul className="footer-link">
                      <div className="font-bold text-xl text-2xl text-white">SUPPORT</div>

                      {allPages &&
                        allPages.map((page) => (
                          <li
                            key={page?.id}
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                              });
                            }}
                            className="item"
                          >
                            <Link className="link text-white" to={`/page/${page?.slug}`}>
                              {page?.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="flex flex-col justify-center items-center m-auto">
                  <h1 className="text-3xl text-white font-medium">
                    LETS KEEP YOU UPDATED
                  </h1>
                  <p className="text-base py-8 pr-3 text-white text-center">
                    Subscribe to our newsletter to get feeds, offers and promos.
                  </p>
                  <div className="rounded-full bg-primary-light d-flex p-3 items-center">
                    <i className="fa fa-envelope-o text-sm mx-3"></i>
                    <input
                      className="text-sm border-none bg-transparent outline-none w-100 p-2"
                      placeholder="Enter your email"
                      ref={emailRef}
                    />
                    <button
                      className="fare-btn fare-btn-primary rounded-full"
                      onClick={subscribe}
                    >
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright-sec text-white">
          <div className="container">
            <div className="row justify-center ">
              <div className="text-[1.8rem] ">
                <span className="font-sans">&copy;</span>
                {year} Farenow. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div
        className="modal fade bd-example-modal"
        id="details"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal text-sm"
          role="document"
        >
          <div className="modal-content ">
            <div className="modal-header">
              <h2 className="modal-title text-lg" id="exampleModalLongTitle">
                {state.modal?.title}
              </h2>
              <button
                ref={ref}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: "3rem",
                  }}
                >
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              {state?.modal?.type === "services" && (
                <table className="table-borderless table rem-1-5">
                  <thead>
                    <tr>
                      <th scope="col-6">Services</th>
                      <th scope="col-6">Services</th>
                    </tr>
                  </thead>
                  <tbody>
                    <FooterServices></FooterServices>
                  </tbody>
                </table>
              )}
              <div className="row m-2 show-all">
                {/* <div className="d-flex show-all align-items-center justify-content-between flex-wrap"> */}
                {state?.modal?.type !== "services" && (
                  <table className="table-borderless table rem-1-5">
                    <tbody>
                      <FooterOtherLinks />
                    </tbody>
                  </table>
                )}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Footer);
