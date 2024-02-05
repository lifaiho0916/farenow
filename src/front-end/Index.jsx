import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HOST } from "../constants";
import ServiceType from "../constants/ServiceType";
import PopularServices from "./Services/services.popular";
import DownloadDialog from "./common/download.dialog";
import { useModal } from "react-hooks-use-modal";
import { useRef } from "react";
import { Page } from "./Page";
import BlogPage from "../front-end/Blog";
import BlogList from "./Blog/list";
import BlogHeader from "./Blog/header";
import ServicesBanner from "./Services/ServicesBanner";
import talentimg from "../assets/find talent.png";
import group1 from "../assets/Group 4.png";
import group2 from "../assets/Frame 11585.png";
import appliactionMockupImg from "../assets/application_mockup_vol.png"
import BlogCommon from "./common/blogcommon/BlogCommon";
import ServiceBtn from "./common/ServiceBtn";
import './common.css';
import { SERVICES } from "../constants";

export const Index = (props) => {
  const headerMenu = useSelector((state) => state.headerMenuReducer);

  const [DownloadModal, openDownload, closeDownload] = useModal("root");
  const downloadType = useRef("APP_STORE");
  const openDownloadDialog = (type) => {
    downloadType.current = type;
    openDownload();
  };

  return (
    <div className="bg-white">
      <section className="py-5">
        <div className="container flex flex-col items-center justify-between lg:flex-row">
          <div className="flex justify-center items-center mb-5">
            <div className="container">
              <h3 className="text-2xl leading-normal tracking-widest uppercase  text-black">
                Easy to Use technology
              </h3>
              <h1 className="text-5xl leading-normal tracking-wide uppercase font-bold text-black my-4 max-w-[700px]">
                Get Everything For Your Business Needs
              </h1>
              <h6 className="text-black text-sx">
                A Booking Platform for Your Daily Needs.
              </h6>
              <button className="uppercase bg-gradient-to-r from-[#002A5A] to-[#005BC5] px-5 py-4 rounded-[10px] text-white hover:opacity-75 mt-5">
                <span className="text-sm leading-loose">Explore our Platform</span>
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center relative right-0">
            <img
              src={appliactionMockupImg}
              className="img-fluid"
            />
          </div>
        </div>
      </section>
      <div
        className="h-fit bg-cover flex flex-col justify-center items-center py-[100px]"
        style={{ backgroundImage: "url('/assets/img/service-bg.png')" }}
      >
        <h1 className="text-white text-3xl sm:text-4xl text-center tracking-widest leading-snug uppercase max-w-[1050px] mb-5">
          Our technology is build for
          every daily life business owner to go
          further and faster
        </h1>
        <div className="flex flex-wrap max-w-[1100px] m-3 p-4">
          {SERVICES.map((service) =>
            <ServiceBtn value={service} key={service} />
          )}
        </div>
        <div className="flex mt-5 w-[320px]">
          <ServiceBtn value="See how it works" />
        </div>
      </div>
      <section className="py-32 bg-gray-50" id={"popular-services"}>
        <div className="container">
          <PopularServices services={headerMenu} />
        </div>
      </section>

      <section className="my-5">
        <img src={talentimg} alt="img" style={{ margin: 'auto' }} />
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
            <div className="text-white" style={{ marginTop: '20px' }}>
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
      <BlogCommon />
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

      <div style={{ backgroundColor: 'rgba(0, 94, 203, 0.2)', height: '680px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <section className="five-star-sec py-20 bg-[#005ECB] relative" style={{ width: '1224px', borderRadius: '10px', height: '550px' }}>
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

