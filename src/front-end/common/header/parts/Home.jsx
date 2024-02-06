import React from 'react';
import heroImage1 from "../../../../assets/hero-img1.png";
import heroImage2 from "../../../../assets/hero-img2.png";
import heroImage3 from "../../../../assets/hero-img3.png";
import heroImage4 from "../../../../assets/hero-img4.png";
import HomeSearchBar from 'front-end/common/searchbar/searchbar.home';
import { useModal } from "react-hooks-use-modal";
import { useRef } from "react";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import DownloadDialog from '../../download.dialog';

const HeaderHomePart = () => {
    const [DownloadModal, openDownload, closeDownload] = useModal("root");
    const downloadType = useRef("APP_STORE");
    const openDownloadDialog = (type) => {
        downloadType.current = type;
        openDownload();
    };

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
                        <div className='flex mb-10 items-center'>
                            <AvatarGroup>
                                <Avatar alt="Remy Sharp" sx={{ width: 35, height: 35 }} src="https://gravatar.com/avatar/b66d203c75eacaccdc487ddeb60c7f95?s=400&d=robohash&r=x" />
                                <Avatar alt="Travis Howard" sx={{ width: 35, height: 35 }} src="https://gravatar.com/avatar/7d67020f019a12618da49e4b0b119373?s=400&d=robohash&r=x" />
                                <Avatar alt="Agnes Walker" sx={{ width: 35, height: 35 }} src="https://gravatar.com/avatar/36c8cf0118a0e8b59e0e0e8fe66eb777?s=400&d=robohash&r=x" />
                                <Avatar alt="Trevor Henderson" sx={{ width: 35, height: 35 }} src="https://gravatar.com/avatar/62cc8188df671200c8a65064bc964773?s=400&d=robohash&r=x" />
                                <Avatar alt="Trevor Henderson" sx={{ width: 35, height: 35 }} src="https://gravatar.com/avatar/f10b82817692b9da1fa35bbb7a628d58?s=400&d=robohash&r=x" />
                            </AvatarGroup>
                            <h6 className="text-xl text-white uppercase ml-2">50k+ Happy Customers</h6>
                        </div>
                        <div>
                            <button
                                className="fare-btn bg-gray-50 hover:bg-primary-light border-primary border-b-2 text-primary-main text-[14px] mr-8 mb-8 w-[200px] px-8"
                                onClick={() => {
                                    openDownloadDialog("APP_STORE");
                                }}
                            >
                                <img
                                    src="/assets/img/app-store-logo.svg"
                                    className="float-left"
                                />
                                Download on the <br />{" "}
                                <span className="font-bold text-sm">App Store</span>
                            </button>
                            <button
                                className="fare-btn bg-gray-50 hover:bg-primary-light border-primary border-b-2 text-primary-main text-[14px] w-[200px] px-8"
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
        <DownloadModal>
            <DownloadDialog type={downloadType.current} />
        </DownloadModal>
    </div>
}

export default HeaderHomePart;