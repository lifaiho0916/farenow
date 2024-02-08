import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { HOST } from "../constants";
import ServiceType from "../constants/ServiceType";
import PopularServices from "./Services/services.popular";
import HomeSearchBar from "./common/searchbar/searchbar.home";
import DownloadDialog from "./common/download.dialog";
import { useModal } from "react-hooks-use-modal";
import { useRef } from "react";
import { Page } from "./Page";
import BlogPage from "../front-end/Blog";
import BlogList from "./Blog/list";
import BlogHeader from "./Blog/header";
import ServicesBanner from "./Services/ServicesBanner";
// import heroimg from "../assets/Hero Image.png";
import bgImg from "../assets/bck.png";
import talentimg from "../assets/find talent.png";
import group1 from "../assets/Group 4.png";
import group2 from "../assets/Frame 11585.png";
import group3 from "../assets/Frame 12148 (1).png";
import BlogCommon from "./common/blogcommon/BlogCommon";
import "./common.css";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import heroImage from "../assets/Hero-Image.png";
import StateCommon from "./common/StateCommon/StateCommon";
import StateListFooter from "./common/StateListFooter";
import PopularProjects from "./common/PopularProjects";

import ReactPlayer from 'react-player'
import appliactionMockupImg from "../assets/application_mockup_vol.png"
import DealwithImg from "../assets/Mask group.png"
import PartnerImg from "../assets/Partners.png";
import PopularImage from "../assets/popularServices.png";
import FiveStarImg from "../assets/Home-screen-pana.png"
import downloadImage1 from "../assets/Rectangle 4120.png";
import downloadImage2 from "../assets/Rectangle 4121.png";
import downloadImage3 from "../assets/Rectangle 4122.png";
import downloadImage4 from "../assets/Rectangle 4118.png";
import downloadImage5 from "../assets/Rectangle 4123.png";
import downloadImage6 from "../assets/Rectangle 4117.png";
import serviceImage1 from "../assets/service1.png";
import serviceImage2 from "../assets/service2.png";
import serviceImage3 from "../assets/service3.png";
import serviceImage4 from "../assets/service4.png";
import serviceImage5 from "../assets/service5.png";
import serviceImage6 from "../assets/service6.png";
import serviceImage7 from "../assets/service7.png";
import serviceImage8 from "../assets/service8.png";
import { SERVICES } from "../constants";
import ServiceBtn from "./common/ServiceBtn";

export const Index = (props) => {
  const headerMenu = useSelector((state) => state.headerMenuReducer);
  const allCountry = useSelector((state) => state.allCountryReducer.countries);
  const partners = useSelector((state) => state.partnersReducer.partners);
  const [defaultUI, setDefaultUI] = useState([]);
  const [loading, setLoading] = useState(false);
  const [carouselPause, setCarouselPause] = useState(false);
  const [partnersItem, setPartnersItem] = useState([]);
  const location = useLocation();

  const [DownloadModal, openDownload, closeDownload] = useModal("root");
  const downloadType = useRef("APP_STORE");
  const openDownloadDialog = (type) => {
    downloadType.current = type;
    openDownload();
  };

  useEffect(() => {
    const country = allCountry?.find((c) => c.iso2.toLowerCase() === "ng");
    const fetchData = async () => {
      setLoading(true);
      if (
        country?.iso2.toLowerCase() !== "za" ||
        country?.iso2.toLowerCase() !== "gh" ||
        country?.iso2.toLowerCase() !== "ke"
      ) {
        try {
          const response = await axios
            .get(`${HOST}/api/sliders?country_id=${country?.id}`)
            .then((res) => {
              if (res.data.data.length !== 0) {
                setDefaultUI(res.data.data);
              } else {
                // setDefaultUI([defaultNigeriaUI]);
              }
            });
        } catch (error) {
          console.error("An error occurred:", error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      }
    };
    fetchData();
  }, [location.pathname, allCountry]);

  useEffect(() => {
    if (partners.partners) {
      setPartnersItem(partners.partners);
    }
  }, [partners]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 599, min: 0 },
      items: 1,
    },
  };
  const partnerResponsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 599, min: 0 },
      items: 4,
    },
  };
  const projects = [
    {
      id: 1,
      src: "https://assets.taskrabbit.com/v3/assets/web/homepage/components/popular_projects/desktop_33-ff031721fe1fd6feeb779c3f4bc64e6384106167f4bead18f1fabeec31c7a3ba.jpg",
      title: "Furniture Assembly",
      amount: "Avg. Project: $52 – $122",
    },
    {
      id: 2,
      src: "https://assets.taskrabbit.com/v3/assets/web/homepage/components/popular_projects/desktop_405-73a06ac4080d93824936820f5b00e83d48e58a1695c69270961ad2e8819a2eb4.jpg",
      title: "Furniture Assembly",
      amount: "Avg. Project: $52 – $122",
    },
    {
      id: 3,
      src: "https://assets.taskrabbit.com/v3/assets/web/homepage/components/popular_projects/desktop_6-56d6fa4bb3945b4fb95911ff2b1389e8973f1f7646ba1bf413f561a954b3c6b9.jpg",
      title: "Furniture Assembly",
      amount: "Avg. Project: $52 – $122",
    },
    {
      id: 4,
      src: "https://assets.taskrabbit.com/v3/assets/web/homepage/components/popular_projects/desktop_59-97f36ec5d917ec6299b04ba7c94f4ad041a62945fa9c44cbbdc6af48a3cdc42b.jpg",
      title: "Furniture Assembly",
      amount: "Avg. Project: $52 – $122",
    },
    {
      id: 5,
      src: "https://assets.taskrabbit.com/v3/assets/web/homepage/components/popular_projects/desktop_69-ae088bb93a160d7c7479f9297e1a4b6cff75a01c3751b91232b04ebd4c703694.jpg",
      title: "Furniture Assembly",
      amount: "Avg. Project: $52 – $122",
    },
    {
      id: 6,
      src: "https://assets.taskrabbit.com/v3/assets/web/homepage/components/popular_projects/desktop_63-53a0834f2365d00e7517ed62ddcb344c6c27c9b076f76deb5b3707d2fe2b3f04.jpg",
      title: "Furniture Assembly",
      amount: "Avg. Project: $52 – $122",
    },
    {
      id: 7,
      src: "https://assets.taskrabbit.com/v3/assets/web/homepage/components/popular_projects/desktop_401-c3ed5c199aa212ee10bda1f06201e4d6676d91d958efb26c4f4722b1f4cd0a38.jpg",
      title: "Furniture Assembly",
      amount: "Avg. Project: $52 – $122",
    },
    {
      id: 8,
      src: "https://assets.taskrabbit.com/v3/assets/web/homepage/components/popular_projects/desktop_113-8a2b4da5105b4a314f753304f2962ed7e1a1db5027353b5bac153cf90d397c53.jpg",
      title: "Furniture Assembly",
      amount: "Avg. Project: $52 – $122",
    },
  ];

  return (
    <div className="bg-white">
      {/* <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        arrows={false}
        infinite={true}
        autoPlay={!carouselPause}
        autoPlaySpeed={5000}
        pauseOnHover
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        className=""
      >
        {!loading &&
          defaultUI?.map((item) => {
            return (
              <div
                className="banner"
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${
                    item?.bg_image ? HOST + item?.bg_image : bgImg
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="container px-12">
                  <div className="row">
                    <div className="col-12">
                      <div className="banner-sec flex flex-col items-center justify-between lg:flex-row w-full">
                        <div className="banner-text mb-5 mb-md-0 w-100">
                          <>
                          <div className="font-bold text-5xl text-dark tracking-[-2px] leading-tight">
                            The <span className="text-primary-main">easy</span>{" "}
                            &
                            <span className="text-primary-main"> reliable</span>{" "}
                            way to take care of your home.
                          </div>
                          <div className="text-xl md:text-base text-dark mt-6">
                            We make it easy for you to create the best
                            experience for your home.
                            <br /> Book for a handyman, get a professional
                            service or shop from a wide variety of products and
                            get them delivered to your doorstep.
                          </div>
                        </>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: item?.description,
                            }}
                          ></div>
                          <div
                            className="my-5"
                            onFocus={() => setCarouselPause(true)}
                            onBlur={() => setCarouselPause(false)}
                          >
                            <HomeSearchBar size="large" />
                          </div>
                        </div>

                        <div className="d-flex  align-items-center justify-content-center relative right-[-2rem]">
                          <img
                            src={HOST + item?.front_image}
                            alt="front"
                            className="img-fluid"
                          />
                          <img src={heroImage} className="img-fluid" alt="" />
                          <img
                            src="/assets/img/banner-sub-img.png"
                            className="w-[16rem] absolute left-[-8rem]"
                          />
                          <img
                            src="/assets/img/provider-card-sample.png"
                            className="absolute w-[40rem] bottom-0 -left-[15rem]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Carousel> */}
      {/* {loading && (
        <div
          className="banner"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container px-12">
            <div className="row">
              <div className="col-12">
                <div className="banner-sec flex flex-col items-center justify-between lg:flex-row w-full">
                  <div className="banner-text mb-5 mb-md-0 w-100">
                    <Skeleton height={125} count={2} />
                    <div className="my-5">
                      <HomeSearchBar size="large" />
                    </div>
                  </div>

                  <div className="d-flex  align-items-center justify-content-center relative right-[-2rem]">
                    <Skeleton height={530} width={520} baseColor="#F1EFF1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && defaultUI.length === 0 && (
        <div
          className="banner"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container px-12">
            <div className="row">
              <div className="col-12">
                <div className="banner-sec flex flex-col items-center justify-between lg:flex-row w-full">
                  <div className="banner-text mb-5 mb-md-0 w-100">
                    <>
                      <div className="font-bold text-5xl text-dark tracking-[-2px] leading-tight">
                        The <span className="text-primary-main">easy</span> &
                        <span className="text-primary-main"> reliable</span> way
                        to take care of your home.
                      </div>
                      <div className="text-xl md:text-base text-dark mt-6">
                        We make it easy for you to create the best experience
                        for your home.
                        <br /> Book for a handyman, get a professional service
                        or shop from a wide variety of products and get them
                        delivered to your doorstep.
                      </div>
                    </>
                    <div className="my-5">
                      <HomeSearchBar size="large" />
                    </div>
                  </div>

                  <div className="d-flex  align-items-center justify-content-center relative right-[-2rem]">
                    <img src={heroImage} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      <section className="py-12 my-6">
        <div className="container flex flex-col items-center justify-between lg:flex-row">
          <div className="flex justify-center items-center mb-5">
            <div className="container">
              <h3 className="text-2xl leading-normal tracking-widest text-black font-albert-sans">
                EASY To USE TECHNOLOGY
              </h3>
              <h1 className="text-5xl tracking-wide font-bold text-black my-4 max-w-[700px] font-albert-sans">
                GET EVERYTHING FOR YOUR BUSINESS NEEDS
              </h1>
              <h6 className="text-black text-sx font-albert-sans">
                A Booking Platform for Your Daily Needs.
              </h6>
              <button className="bg-gradient-to-r from-[#002A5A] to-[#005BC5] px-5 py-4 rounded-[10px] text-white hover:opacity-75 mt-5">
                <span className="text-sm leading-loose font-albert-sans">EXPLORE OUR PLATFORM</span>
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center relative">
            <img
              src={appliactionMockupImg}
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      <section>
        <div
          className="h-fit bg-cover flex flex-col justify-center items-center py-12"
          style={{ backgroundImage: "url('/assets/img/service-bg.png')" }}
        >
          <h1 className="text-white text-3xl sm:text-4xl text-center tracking-widest leading-snug max-w-[1050px] mb-3 pt-12 mt-12 font-gobold-lowplus">
            OUR TECHNOLOGY IS BUILD FOR
            EVERY DAILY LIFE BUSINESS OWNER TO GO
            FURTHER AND FASTER
          </h1>
          <div className="flex flex-wrap max-w-[1100px] m-5 p-4">
            {SERVICES.map((service) =>
              <ServiceBtn value={service} key={service} />
            )}
          </div>
          <div className="flex mt-5 w-[320px] mb-12 pb-12">
            <ServiceBtn value="See how it works" />
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container">
          <div className="flex justify-center mb-3 mt-5">
            <img src={PopularImage} className="w-[80%] lg:w-auto" />
          </div>
          <h3 className="text-base text-dark text-center mx-auto font-albert-sans my-3">
            Explore our top services. All our services are designed with you in mind.
          </h3>
          <div className="flex flex-wrap justify-evenly mt-5 max-w-[1420px] pt-5">
            <div className="relative w-[345px] h-[360px] m-2">
              <img src={serviceImage1} className="object-cover w-[345px] h-[360px]" />
              <h3 className="absolute bottom-[20px] left-[20px] text-white font-albert-sans">
                ACCOUNTING & FINANCE
              </h3>
            </div>
            <div className="relative w-[345px] h-[360px] m-2">
              <img src={serviceImage2} className="object-cover w-[345px] h-[360px]" />
              <h3 className="absolute bottom-[20px] left-[20px] text-white font-albert-sans">
                BUSINESS
              </h3>
            </div>
            <div className="relative w-[345px] h-[360px] m-2">
              <img src={serviceImage3} className="object-cover w-[345px] h-[360px]" />
              <h3 className="absolute bottom-[20px] left-[20px] text-white font-albert-sans">
                CENTRL AIR CONDITIONING
              </h3>
            </div>
            <div className="relative w-[345px] h-[360px] m-2">
              <img src={serviceImage4} className="object-cover w-[345px] h-[360px]" />
              <h3 className="absolute bottom-[20px] left-[20px] text-white font-albert-sans">
                CLEANING SERVICES
              </h3>
            </div>
            <div className="relative w-[345px] h-[360px] m-2">
              <img src={serviceImage5} className="object-cover w-[345px] h-[360px]" />
              <h3 className="absolute bottom-[20px] left-[20px] text-white font-albert-sans">
                ELECTRICAL SERVICES
              </h3>
            </div>
            <div className="relative w-[345px] h-[360px] m-2">
              <img src={serviceImage6} className="object-cover w-[345px] h-[360px]" />
              <h3 className="absolute bottom-[20px] left-[20px] text-white font-albert-sans">
                EVENT ORGANIZE
              </h3>
            </div>
            <div className="relative w-[345px] h-[360px] m-2">
              <img src={serviceImage7} className="object-cover w-[345px] h-[360px]" />
              <h3 className="absolute bottom-[20px] left-[20px] text-white font-albert-sans">
                PROGRMMING & TECH
              </h3>
            </div>
            <div className="relative w-[345px] h-[360px] m-2">
              <img src={serviceImage8} className="object-cover w-[345px] h-[360px]" />
              <h3 className="absolute bottom-[20px] left-[20px] text-white font-albert-sans">
                LIFESTYLE
              </h3>
            </div>
          </div>
          {/* <PopularServices services={headerMenu} /> */}
        </div>
      </section>
      {/* <section className="pb-32 bg-gray-50">
        <div className="container">
          <PopularProjects projects={projects} />
        </div>
      </section> */}

      <section className="py-12 my-6">
        <div className="py-12 my-6">
          <div className="mb-20">
            <h1 className="text-4xl font-bold text-center font-rubik">DEAL WITH <span className="text-[#0068E1]">PROFESSIONALS</span></h1>
            <h6 className="text-sm text-center mt-1 font-albert-sans">For getting best services, check out professional's profile</h6>
          </div>
          <div className="container flex flex-col items-center justify-between lg:flex-row">
            <div className="d-flex align-items-center justify-content-center relative">
              <div className="w-[60%] h-[90%] border-[#298CFF] border-dashed border-2 rounded-[15px] absolute right-3 top-1"></div>
              <img
                src={DealwithImg}
                className="img-fluid w-[90%] mt-5 z-10"
              />
            </div>
            <div className="flex justify-center items-center max-w-[100%] lg:max-w-[50%]">
              <div className="container">
                <div className="m-5">
                  <h2 className="text-3xl text-black tracking-wide font-gobold-lowplus">
                    VETTED <span className="text-[#0068E1]">BACKGROUND - CHECKED</span> PROFESSIONALS
                  </h2>
                  <h5 className="leading-normal text-sm text-[#747474] mt-2 font-albert-sans">Cleaning & handyman tasks booked and paid for directly through the farenow platform are performed by experienced, background-checked professionals who are highly rated by customers like you.</h5>
                </div>
                <div className="m-5">
                  <h2 className="text-3xl uppercase text-black tracking-wide font-gobold-lowplus">
                    YOUR <span className="text-[#0068E1]">HAPPINESS</span>, GUARANTEED
                  </h2>
                  <h5 className="leading-normal text-sm text-[#747474] mt-2 font-albert-sans">Your happiness is our goal. If you are not happy, we will work to make it right. Our friendly customer service agents are available 24 hours a day, 7 days a week. The Farenow Happiness Guarantee only applies when you book and pay for service directly through the Farenow platform.</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="my-5">
        <img src={talentimg} alt="img" style={{ margin: "auto" }} />
        <div
          className="container"
          style={{ marginTop: "15rem ", marginBottom: "15rem" }}
        >
          <div className="row">
            <div className="col-lg-6 my-auto">
              <img src={group1} alt="img" className="img-fluid " />
            </div>
            <div className="col-lg-6 setimgmobile">
              <img src={group2} alt="img" className="img-fluid" />
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="background-checked pad-y">
        <div className="container px-12">
          <div className="row">
            <div className="col-12">
              <div className="back-check-box d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap space-x-16">
                <img
                  src="/assets/img/back-check.png"
                  className="img-fluid w-[56rem] m-8"
                  alt=""
                />

                <div className="d-flex flex-column space-y-16">
                  <div className="bg-primary-light p-10 rounded-[18px] border-primary border-b-4">
                    <h1 className="text-primary-main text-3xl  font-medium mb-10">
                      Vetted, Background - <br /> Checked Professionals
                    </h1>
                    <p className="text-base text-dark">
                      Cleaning and handyman tasks booked and paid for directly
                      through the Farenow platform are performed by experienced,
                      background-checked professionals who are highly rated by
                      customers like you.
                    </p>
                  </div>
                  <div className="bg-orange-100 p-10 rounded-[18px] border-orange-300 border-b-4">
                    <h1 className="text-orange-300 text-3xl font-medium mb-10">
                      Your Happiness, Guaranteed
                    </h1>
                    <p className="text-base text-dark">
                      Your happiness is our goal. If you’re not happy, we’ll
                      work to make it right. Our friendly customer service
                      agents are available 24 hours a day, 7 days a week. The
                      Farenow Happiness Guarantee only applies when you book and
                      pay for a service directly through the Farenow platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <index /> */}

      <section className="download-apps bg-gradient-to-r from-[#0050AC] from-10% via-[#001A38] via-20% to-[#001A38] to-95% pt-12">
        <div className="container">
          <div className="d-flex flex-wrap space-x-22 sm:space-x-10 flex-lg-nowrap mobileside pt-12 relative">
            <div className="text-white max-w-[100%] lg:max-w-[42%]" style={{ marginTop: "20px" }}>
              <h1 className="text-white text-5xl font-bold tracking-tight font-goblod-lowplus">
                DOWNLOAD THE FRENOW APPLICATION
              </h1>
              <p className="text-base py-16 pr-[85px] text-white font-albert-sans">
                Book and manage appointments, message your pback-layerrofessional, view professional profiles and ratings, see real-time location of your professional and so much more.
              </p>
              <div>
                <button
                  className="fare-btn bg-gray-50 hover:bg-primary-light border-primary border-b-2 text-primary-main text-[14px] mr-8 mb-8 w-[240px] px-12"
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
                  className="fare-btn bg-gray-50 hover:bg-primary-light border-primary border-b-2 text-primary-main text-[14px] w-[240px] px-12"
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
            <div className="flex">
              <div className="flex items-end mx-3">
                <img
                  src={downloadImage1}
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="flex items-end mx-3">
                <img
                  src={downloadImage2}
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-end mx-3">
                <img
                  src={downloadImage4}
                  className="img-fluid mb-3"
                  alt=""
                />
                <img
                  src={downloadImage3}
                  className="img-fluid mt-3"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-end mx-3">
                <img
                  src={downloadImage6}
                  className="img-fluid mb-3"
                  alt=""
                />
                <img
                  src={downloadImage5}
                  className="img-fluid mt-3"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
      <section className="shop-for-home pad-y">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="common-heading text-center">
                <div className="title">Shop for your home with Farenow</div>
                <div className="sub-des">
                  Shop furniture, electronics, appliances, and more. Everything
                  comes with expert installation by Farenow.
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="shop-baner">
                <div className="hany-shop-img">
                  <img
                    src="/assets/img/shop-home.jpg"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <hr />
          </div>
        </div>
      </div>
    */}
      {/* <StateCommon /> */}
      <BlogCommon />
      {/* <section className="our-partners-sec pad-y bg-gray-50 mt-10">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-16 text-center">
                <div className="text-4xl text-primary-main font-medium">
                  {partners?.info?.title
                    ? partners?.info?.title
                    : "Our Partners"}
                </div>
                <div className="text-base text-dark">
                  Farenow works with partners who want to provide their
                  customers, tenants, or employees <br /> easy access to quality
                  home services at affordable prices.
                  {partners?.info?.description
                    ? partners?.info?.description
                    : "Farenow works with partners who want to provide their customers, tenants, or employees  easy access to quality home services at affordable prices."}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={partnerResponsive}
                arrows={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                pauseOnHover
                transitionDuration={500}
                slidesToSlide={4}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                className="d-flex flex-wrap space-x-12 space-y-12 justify-center align-items-end pb-5"
              >
                {partnersItem?.map((partner, index) => {
                  return (
                    <div
                      key={index}
                      title={partner.name}
                      className="px-12 py-8 mx-4 bg-white rounded-[16px] shadow-[0_8px_16px_0_#00000014]"
                    >
                      <img
                        src={HOST + partner.image}
                        className="h-[4rem]"
                        alt="partner"
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </section> */}
      <section className="our-partners-sec pad-y">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-16 text-center">
                <div className="flex justify-center mb-3">
                  <img src={PartnerImg} className="w-[80%] lg:w-auto" />
                </div>
                <h3 className="text-base text-dark max-w-[650px] text-center mx-auto font-albert-sans">
                  Farenow works with partners who want to provide their customers, tenants, or employees easy access to quality home services at affordable prices.
                </h3>
                <button className="bg-gradient-to-r from-[#002A5A] to-[#005BC5] px-5 py-3 rounded-[10px] text-white hover:opacity-75 mt-5">
                  <span className="text-sm leading-loose font-albert-sans">BE OUR PARTNER</span>
                </button>
              </div>
            </div>
            <div className="col-md-12">
              <div className="flex justify-center p-5 relative w-[90%] m-auto">
                <div className="absolute border-[#298CFF] border-dashed border-2 top-0 w-[40%] h-[45%] rounded-[10px] left-0"></div>
                <div className="absolute border-[#298CFF] border-dashed border-2 bottom-0 w-[40%] h-[45%] rounded-[10px] right-0"></div>
                <ReactPlayer
                  url={'https://youtube.com/@Fare-Now?si=IeJZF7chogCV4a2J'}
                  width={'100%'}
                  height={'auto'}
                  controls
                  style={{
                    borderRadius: 20,
                    overflow: 'hidden',
                    zIndex: 10
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-[#F8FBFF]">
        <div className="container flex flex-col items-center justify-between lg:flex-row">
          <div className="flex justify-center items-center mb-5 max-w-[100%] lg:max-w-[50%]">
            <div className="container">
              <h1 className="text-5xl font-bold text-black my-4 font-goblod-lowplus">
                ARE YOU A <span className="text-white bg-[#0068E1] rounded-xl">FIVE STAR</span> PROFESSIONAL?
              </h1>
              <h6 className="text-black text-sx text-[#747474] leading-normal font-albert-sans">
                From cleaners to handymen to smart home installers, Farenow is always looking for service professionals who are experts in their trade and provide great service to their customers. The best home service professionals use Farenow for the great pay and flexible scheduling.
              </h6>
              <button className="bg-gradient-to-r from-[#002A5A] to-[#005BC5] px-5 py-4 rounded-[10px] text-white hover:opacity-75 mt-5">
                <span className="text-sm leading-loose font-albert-sans">BECOME A FARENOW PRO</span>
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <img
              src={FiveStarImg}
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      {/* <div
        style={{
          backgroundColor: "rgba(0, 94, 203, 0.2)",
          height: "680px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <section
          className="five-star-sec py-20 bg-[#005ECB] relative"
          style={{ width: "1224px", borderRadius: "10px", height: "550px" }}
        >
          <img
            src="/assets/img/pro-back1.png"
            className="absolute left-0 top-0"
          />
          <img
            src="/assets/img/pro-back2.png"
            className="absolute right-0 bottom-0"
          />
          <div className="container d-flex flex-wrap justify-between items-center px-8 amig ">
            <div className="md:basis-1/2">
              <h1 className="text-white text-[4rem] font-medium my-8">
                Are You a Five Star Professional?
              </h1>
              <p className="text-xl text-gray-100 mb-16">
                From cleaners to handymen to smart home installers, Farenow is
                always looking for service professionals who are experts in
                their trade and provide great service to their customers. The
                best home service professionals use Farenow for the great pay
                and flexible scheduling.
              </p>
              <Link
                to="/provider/registration"
                className="fare-btn fare-btn-outline-primary fare-btn-lg my-8"
              >
                Become a Farenow Pro
              </Link>
            </div>
            <img
              src="/assets/img/pro-img.png"
              className="float-right img-fluid relative "
            />
          </div>
        </section>
      </div> */}

      <DownloadModal>
        <DownloadDialog type={downloadType.current} />
      </DownloadModal>

      {/* <StateListFooter /> */}
    </div>
  );
};
