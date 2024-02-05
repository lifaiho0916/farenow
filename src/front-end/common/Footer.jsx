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
import { changeCountry } from "../../store/Slices/countryslice/countryslice";
import { TfiWorld } from "react-icons/tfi";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./header/footer.css";
let myPages = {
  Articles :{
    name:"Articles",
    url: "articles"
  },
  Policy: {
    name: "Privacy Policy",
    url: "privacy-policy",
  },
  "Terms And Condition": {
    name: "Terms of Use",
    url: "terms-conditions",
  },
  About : {
    name: "About Us",
    url: "about-us"
  },
  Contact :{
    name:"Contact Us",
    url: "contact-us"
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

  const ref = useRef(null);
  const emailRef = useRef(null);

  const year = new Date().getFullYear();

  const getLinks = useSelector((state) => state?.footerReducer?.pageLinks);
  const pages = useSelector((state) => state?.footerReducer?.pages);
  const headerMenu = useSelector((state) => state?.headerMenuReducer);

  const [DownloadModal, openDownload, closeDownload] = useModal("root");
  const downloadType = useRef("APP_STORE");

  useEffect(() => {
    dispatch(getPages());
  }, []);

  console.log("pagesakshs", pages);

  useEffect(() => {
    if (getLinks?.length > 0) {
      setState({
        links: getLinks,
      });
    }
  }, [getLinks]);

  const FooterServices = () => {
    let sub_services = [];
    headerMenu?.forEach((service) =>
      service?.sub_services?.forEach((sub_service, index) => {
        sub_services = [
          ...sub_services,
          { ...sub_service, service: service.name },
        ];
      })
    );

    return sub_services.map(
      (sub_service, index) =>
        !!(index % 2 == 0) && (
          <tr className="show-all" key={index}>
            <td
              className="col-6"
              key={`${sub_service.service_id}_${sub_service.id}`}
            >
              <Link
                to={`/services/search?subService=${sub_service.id}`}
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
                key={`${sub_services[index + 1].service_id}_${
                  sub_services[index + 1].id
                }`}
              >
                <Link
                  to={`/services/search?subService=${
                    sub_services[index + 1].id
                  }`}
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

  const { selectcountry } = useSelector((state) => state.countryReducer);

  const FooterOtherLinks = () => {
    if (state.modal?.type == "all") {
      const otherLinks = state?.links?.filter(
        (link) => link.type == null && link.is_blog == false
      );
      return otherLinks.map(
        (link, index) =>
          !!(index % 2 == 0) && (
            <tr className="show-all" key={index}>
              <td>
                <a href={link?.url} className="link" target="_blank">
                  {link?.name || link?.page}
                </a>
              </td>
              {otherLinks[index + 1] && (
                <td>
                  <a
                    href={otherLinks[index + 1]?.url}
                    className="link"
                    target="_blank"
                  >
                    {otherLinks[index + 1]?.name || otherLinks[index + 1]?.page}
                  </a>
                </td>
              )}
            </tr>
          )
      );
    }
    if (state?.modal?.type == "blog") {
      const blogLinks = state?.links?.filter((link) => link?.is_blog);
      return blogLinks.map(
        (link, index) =>
          !!(index % 2 == 0) && (
            <tr className="show-all" key={index}>
              <td>
                <a href={link?.url} className="link" target="_blank">
                  {link?.name || link?.page}
                </a>
              </td>
              {blogLinks[index + 1] && (
                <td>
                  <a
                    href={blogLinks[index + 1]?.url}
                    className="link"
                    target="_blank"
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
      <footer className="footer-sec pt-32 py-24">
        <div className="container px-16">
          <div className="grid lg:grid-cols-10 gap-4 ">
            <div className="col-span-3 div1">
              <h1 className="text-3xl text-primary-main font-medium">
                Lets keep you updated
              </h1>
              <p className="text-[1.7rem] py-8 pr-3">
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
                  Send
                </button>
              </div>
              <p className="text-[1.6rem] font-medium py-8 text-gray-600">
                Download the Farenow App
              </p>
              <div className="flex gap-6">
                <button
                  onClick={() => {
                    openDownloadDialog("APP_STORE");
                  }}
                >
                  <img src="/assets/img/download-app-store.svg" />
                </button>
                <button
                  href={GOOGLE_PLAY.user}
                  onClick={() => {
                    openDownloadDialog("GOOGLE_PLAY");
                  }}
                >
                  <img src="/assets/img/download-google-play.svg" />
                </button>
              </div>
            </div>
            <div className="col-start-5 col-span-2 div2">
              <div className="flex items-center md:justify-center">
                <ul className="footer-link">
                  <div className="mb-4 font-bold text-xl">Popular Services</div>
                  {(() => {
                    let total = 0;
                    return headerMenu?.map((service) =>
                      service?.sub_services?.map((sub_service) => {
                        if (total < 8 && total != null) {
                          total++;
                          return (
                            <li
                              className="item"
                              key={`${service.id}_${sub_service.id}`}
                            >
                              <Link
                                to={`/services/${service.name.replace(
                                  " ",
                                  "-"
                                )}/${sub_service.name
                                  .replace(/[' ']/g, "-")
                                  .replace("/", "-")}`}
                                // to={`/services/${service.name.replace(
                                //   " ",
                                //   "-"
                                // )}/${sub_service.name.replace(" ", "-")}`}
                                className="link"
                              >
                                {sub_service.name}
                              </Link>
                              {/* <a href="#" className="link">
                              </a> */}
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
            <div className="col-span-2">
              <div className="d-flex align-items-center md:justify-center">
                <ul className="footer-link">
                  <div className="mb-4 font-bold text-xl">Pages</div>
                  <li className="item">
                    <Link to={"/blog"} className="link">
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
                    <Link to={"/register"} className="link">
                      Sign Up
                    </Link>
                  </li>
                  <li className="item">
                    <Link to={"/provider/registration"} className="link">
                      Become a Pro
                    </Link>
                  </li>
                  <li className="item">
                    <Link className="link" to="/help">
                      Help
                    </Link>
                  </li>
                  <li className="item">
                    <Link className="link" to="/faq">
                      FAQ
                    </Link>
                  </li>
                  {state?.links?.map((link) => {
                    let countLink = 0;
                    if (
                      link.type == null &&
                      link.is_blog == false &&
                      countLink < 8
                    ) {
                      countLink = countLink + 1;
                      return (
                        <li className="item" key={link?.id}>
                          <a href={link?.url} className="link" target="_blank">
                            {link?.name || link?.page}
                          </a>
                        </li>
                      );
                    }
                  })}
                  {state?.links?.filter(
                    (link) => link.type == null && link.is_blog == false
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
            <div className="col-span-2">
              <div className="d-flex align-items-center md:justify-center">
                <ul className="footer-link">
                  <div className="mb-4 font-bold text-xl">Support</div>
                
              
                  {pages?.data?.map((page) => (
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
                      <Link
                        className="link"
                        to={`${myPages[page?.name]?.url}`}
                      >
                        {myPages[page?.name]?.name}
                      </Link>
                      
                      {/* <a href="#">{page?.name}</a> */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className=" d-flex align-items-center gap-2 icon footer-country ">
        
              <i style={{ fontSize: "2rem", fontWeight: "800" }}>
            <span>
              <TfiWorld />
            </span>
          </i>
          <FormControl fullWidth size="small" className="mobc" >
            
              <div className="dropdown-footer" >
              <Select
                defaultValue={"nigeria"}
                onChange={(e) => dispatch(changeCountry(e.target.value))} 
                style={{fontSize: "2rem", fontWeight: "500"}}
                className="footer-arrow"
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
                        borderRadius:'10px',

                      },
                      "& .MuiMenuItem-root:hover": {
                        backgroundColor: "#94bceb",
                        borderRadius:'10px'

                      },
                      "& .MuiMenuItem-root.Mui-selected:hover": {
                        backgroundColor: "#94bceb",
                        borderRadius:'10px'

                      }
                    }
                  }
                }}
                >
                
              <img src={nigeriaflag} style={{width:'30px',marginLeft:'15px'}}/><MenuItem  value={"nigeria"} style={{fontSize:'16px',width:'180px'}}>Nigeria</MenuItem>
               <img src={ghanaflag} style={{width:'30px',marginLeft:'15px'}}/><MenuItem value={"gana"} style={{fontSize:'16px'}} >Ghana</MenuItem>
              <img src={rwandaflag} style={{width:'30px',marginLeft:'15px'}}/> <MenuItem value ={"rawanda"} style={{fontSize:'16px'}}>Kenya</MenuItem>
               <img src={southflag} style={{width:'30px',marginLeft:'15px'}}/><MenuItem value={"southafrica"} style={{fontSize:'16px'}}>South Africa</MenuItem>
                
              </Select>
              </div>

            </FormControl>
       
          {/* <MdKeyboardArrowDown /> */}
        </div>
      </footer>

      <footer className="footer-sec2 bg-primary-dark m-0">
        <div className="container">
          <div className="row">
            <div className="col-md-12 flex gap-6 justify-content-between flex-col md:items-start md:flex-row items-center">
              <div className="">
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

              <div className="footer-about text-center text-md-left mb-5">
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
                <ul className="social d-flex">
                  {state?.links?.map((link) => {
                    if (link.type != null) {
                      if (link.type == "FACEBOOK") {

                        return (
                          <li
                            className="item mr-4 bg-[#7AB8FF66]"
                            key={link.id}
                          >
                            <a href={link.url} target="_blank">
                              <img
                                src="/assets/img/facebook.png"
                                className="img-fluid"
                                alt="socail"
                              />
                            </a>
                            {console.log(link.url)}
                          </li>
                        );
                      }
                      if (link.type == "INSTAGRAM") {
                        return (
                          <li
                            className="item mr-4 bg-[#7AB8FF66]"
                            key={link.id}
                          >
                            <a href={link.url} target="_blank">
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
                            <a href={link.url} target="_blank">
                              <img
                                src="/assets/img/twitter.png"
                                className="img-fluid"
                                alt="socail"
                              />
                            </a>
                          </li>
                        );
                      }
                      if (link.type == "WHATS_APP") {
                        return (
                          <li className="item twitter mr-4" key={link.id}>
                            <a href={link.url} target="_blank">
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
            </div>
          </div>
        </div>
      </footer>

      <div className="container m-0">
        <div className="row">
          <div className="col-12">
            <hr />
          </div>
        </div>
      </div>

      <div
        className="copyright-sec text-white"
        style={{ background: "#1e2d4d", marginTop: "-.5rem" }}
      >
        <div className="container">
          <div className="row justify-center ">
            <div className="text-[1.8rem] ">
              <span className="font-sans">&copy;</span>
              {year} Farenow. All rights reserved.
            </div>
          </div>
        </div>
      </div>

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
              {state?.modal?.type == "services" && (
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
                {state?.modal?.type != "services" && (
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

