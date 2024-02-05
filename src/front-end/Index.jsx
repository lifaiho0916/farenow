import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
import heroimg from "../assets/Hero Image.png";
import bgImg from "../assets/bck.png";
import talentimg from "../assets/find talent.png";
import group1 from "../assets/Group 4.png";
import group2 from "../assets/Frame 11585.png";
import group3 from "../assets/Frame 12148 (1).png";
import BlogCommon from "./common/blogcommon/BlogCommon";
import './common.css';

export const Index = (props) => {
  const headerMenu = useSelector((state) => state.headerMenuReducer);
  console.log("======>", headerMenu);

  const [DownloadModal, openDownload, closeDownload] = useModal("root");
  const downloadType = useRef("APP_STORE");
  const openDownloadDialog = (type) => {
    downloadType.current = type;
    openDownload();
  };

  return (
    <div className="bg-white">
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
              <div className="banner-sec flex flex-col items-center justify-between lg:flex-row">
                <div className="banner-text mb-5 mb-md-0 w-100">
                  <div className="font-bold text-5xl text-dark tracking-[-2px] leading-tight">
                    The <span className="text-primary-main">easy</span> &
                    <span className="text-primary-main"> reliable</span> way to
                    take care of your home.
                  </div>
                  <div className="text-xl md:text-base text-dark mt-6">
                    We make it easy for you to create the best experience for
                    your home.
                    <br /> Book for a handyman, get a professional service or
                    shop from a wide variety of products and get them delivered
                    to your doorstep.
                  </div>
                  <div className="my-5">
                    <HomeSearchBar size="large" />
                  </div>
                </div>

                <div className="d-flex  align-items-center justify-content-center relative right-[-2rem]">
                  <img src={heroimg} className="img-fluid" />
                  {/* <img
                    src="/assets/img/banner-img.png"
                    className="w-[42rem] absolute"
                    alt=""
                  />
                  <img
                    src="/assets/img/banner-sub-img.png"
                    className="w-[16rem] absolute left-[-8rem]"
                  />
                  <img
                    src="/assets/img/provider-card-sample.png"
                    className="absolute w-[40rem] bottom-0 -left-[15rem]" */}
                  {/* /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nav">
                <div className="nav-data px-4">
                    <h4 className="flex items-center">Popular : </h4>
                    <div className="divbtn1" style={{display:'flex', gap:"20px"}}>
                    <button className='btn'>Handyman Services</button>
                    <button className='btn'>Home Cleaning</button>
                    </div>
                   <div className="divbtn2 pt-2" style={{display:'flex', gap:"20px"}}>
                   <button className='btn'>Electricity</button>
                    <button className='btn'>Computers</button>
                   </div>
                    
                </div>
              </div>
      <section className="py-32 bg-gray-50" id={"popular-services"}>
        <div className="container">
          <PopularServices services={headerMenu} />
        </div>
      </section>

      <section className="my-5">
        <img src={talentimg} alt="img" style={{margin:'auto'}}  />
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
      </section>

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
      <index />
      <section className="download-apps pad-y bg-primary-dark">
        <div className="container">
          <div className="d-flex flex-wrap space-x-22 sm:space-x-10 align-items-center flex-lg-nowrap mobileside">
            <img
              src="/assets/img/mobile-app.png"
              className="img-fluid w-[54rem] "
            />
            <div className="text-white" style={{marginTop:'20px'}}>
              <h1 className="text-white text-5xl font-bold">
                Download the Farenow App
              </h1>
              <p className="text-base py-16 pr-[85px]">
                Book and manage appointments, message your
                pback-layerrofessional, view professional profiles and ratings,
                see real-time location of your professional and so much more.
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
    <BlogCommon/>
      <section className="our-partners-sec pad-y bg-gray-50 mt-10">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-16 text-center">
                <div className="text-4xl text-primary-main font-medium">
                  Our Partners
                </div>
                <div className="text-base text-dark">
                  Farenow works with partners who want to provide their
                  customers, tenants, or employees <br /> easy access to quality
                  home services at affordable prices.
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="d-flex flex-wrap space-x-12 space-y-12 justify-center align-items-end">
                {[1, 2, 3, 4].map((partnerIdx) => (
                  <div
                    key={partnerIdx}
                    className="px-12 py-8 bg-white rounded-[16px] shadow-[0_8px_16px_0_#00000014]"
                  >
                    <img
                      src={`/assets/img/partner-${partnerIdx}.png`}
                      className="h-[4rem]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{backgroundColor:'rgba(0, 94, 203, 0.2)',height:'680px',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <section className="five-star-sec py-20 bg-[#005ECB] relative" style={{width:'1224px',borderRadius:'10px',height:'550px'}}>
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
              always looking for service professionals who are experts in their
              trade and provide great service to their customers. The best home
              service professionals use Farenow for the great pay and flexible
              scheduling.
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
      </div>
      



      <DownloadModal>
        <DownloadDialog type={downloadType.current} />
      </DownloadModal>
    </div>
  );
};

