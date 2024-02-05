import React from 'react';
import heroImage1 from "../../../../assets/hero-img1.png";
import heroImage2 from "../../../../assets/hero-img2.png";
import heroImage3 from "../../../../assets/hero-img3.png";
import heroImage4 from "../../../../assets/hero-img4.png";
import HomeSearchBar from 'front-end/common/searchbar/searchbar.home';

const HeaderHomePart = () => {
    return <div className="container px-12">
        <div className="row">
            <div className="col-12">
                <div className="banner-sec flex flex-col items-center justify-between lg:flex-row">
                    <div className="banner-text mb-5 mb-md-0 w-100">
                        <div className="font-bold text-5xl tracking-[-2px] leading-tight uppercase text-[#FCFCFC]">
                            Find Trusted services for every need
                        </div>
                        <div className="text-xl md:text-sm text-white mt-6">
                            Whether it's a special event, a daily commute, or a unique celebration, FareNow connects you with a network of reliable service providers. Explore a wide range of services that cater to your needs and exceed your expectations.
                        </div>
                        <div className="my-5">
                            <HomeSearchBar size="large" />
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-center relative right-[-2rem]">
                        <div className="flex items-center">
                            <div className='m-3'>
                                <img src={heroImage1} className="img-fluid" />
                            </div>
                            <div className="flex flex-col m-3">
                                <img src={heroImage2} className="img-fluid mb-3" />
                                <img src={heroImage3} className="img-fluid mt-3" />
                            </div>
                            <div className="m-3">
                                <img src={heroImage4} className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default HeaderHomePart;