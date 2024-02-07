import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import bimg from "../../../styles/images/bcardsimg.png";
import { FiBook } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./blogc.css";
import axios from "axios";
import { HOST } from "../../../constants";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import noImage from "../../../assets/no-image.png";

import BlogImg from "../../../assets/OurBlogs.png"

const BlogCommon = () => {
  const ref = useRef();
  const [blogs, setBlogs] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const res = axios
      .get(`${HOST}/api/blog?country_id=${localStorage.getItem("country")}`)
      .then((res) => setBlogs(res?.data?.data));
  }, []);

  const quillToHTML = (content) => {
    if (content) {
      const converter = new QuillDeltaToHtmlConverter(JSON.parse(content).ops);
      const slicedContent = converter.convert().slice(0, 150);

      return slicedContent + "...";
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 599, min: 0 },
      items: 1,
    },
  };

  const handleReadMore = (slug) => {
    history.push(`/blog-details/${slug}`);
  };

  return (
    <div className="bg-white mt-5 pt-5">
      <div className="flex justify-center mt-5 mb-3">
        <img src={BlogImg} className="w-[80%] lg:w-auto" />
      </div>
      <h3 className="text-base text-dark max-w-[650px] text-center mx-auto">
        Learn more about us and our services by reading our blogs
      </h3>
      {/* <div className="flex gap-20 w-[80%] mx-auto my-20 py-10 rounded-[20px]  border bg-white navbar-blogs ">
        <div className="d-flex gap-20 ml-10 items-center nav-bloglinks">
          <Link to="">News</Link>
          <Link to="">Trends</Link>
          <Link to="">Inspirational</Link>
          <Link to="">LifeStyle</Link>
          <Link to="">Resources</Link>
        </div>
        <div className=" d-flex gap-2 w-[50%] mr-10 bg-gray-100 items-center py-2 rounded-[10px] ">
          <i className=" ml-3" style={{ color: "gray" }}>
            <BiSearch />
          </i>
          <input
            type="text"
            className=" bg-transparent outline-none py-2 w-full "
            placeholder="Search"
          />
        </div>
      </div> */}

      {/* <div className=" w-[80%] mx-auto blog-cards ">
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          arrows={false}
          infinite={true}
          //  autoPlay={true}
          //  autoPlaySpeed={2000}
          //  transitionDuration={500}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          className="custom-carousel"
          id="custom-carousel"
        >
          {blogs &&
            blogs?.map((blog, index) => {
              return (
                <div
                  key={index}
                  className={`card rounded-[20px] mt-5 h-[514px] overflow-hidden mb-[110px]`}
                  style={{ width: "35rem", margin: "auto" }}
                >
                  <img
                    src={blog?.featured_image ? blog?.featured_image : noImage}
                    className="card-img-top w-[33rem] mt-3 ml-3 rounded-[10px] h-[225px]"
                    alt="..."
                  />
                  <div className="card-body relative">
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "24px",
                        fontWeight: "500",
                        lineHeight: "24px",
                        color: "#151415",
                      }}
                    >
                      {blog?.title.slice(0, 50)}{" "}
                      <span>{blog?.title.length > 50 ? "..." : ""}</span>
                    </h5>
                    <div
                      className=" d-flex mt-6 gap-6  "
                      style={{
                        fontSize: "15px",
                        color: "#868B9A",
                        fontWeight: "500",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <CiUser />
                        <span>Jake </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AiOutlineClockCircle />
                        <span>11/04/22 </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiBook />
                        <span>3m read </span>
                      </div>
                    </div>
                    <p
                      ref={ref}
                      className={`card-text mt-4 blog-card blog-card-text`}
                      dangerouslySetInnerHTML={{
                        __html: quillToHTML(
                          blog?.contents[0]?.content &&
                            blog?.contents[0]?.content
                        ),
                      }}
                      style={{ fontSize: "16px", color: "#555555" }}
                    ></p>
                    <button
                      onClick={() => handleReadMore(blog.slug)}
                      className={`absolute bottom-3 btn btn-primary w-[95%] mx-auto p-2 rounded-[10px]`}
                      style={{ fontSize: "22px" }}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              );
            })}
        </Carousel>
      </div> */}
      <div className="w-[95%] md:w-[60%] mx-auto grid grid-cols-12 gap-8 pb-8">
        {blogs &&
          blogs.slice(0, 4).map((blog, index) => {
            return (
              <div
                className={`bg-white ${index === 0 ? "col-span-12" : "col-span-12 md:col-span-4"
                  }`}
              >
                <div className="grid grid-cols-12">
                  <div
                    className={`${index === 0 ? "col-span-12  md:col-span-8" : "col-span-12"
                      }`}
                  >
                    <img
                      src={
                        blog?.featured_image ? blog?.featured_image : noImage
                      }
                      className={`w-full aspect-auto ${index === 0
                        ? "h-[255px] md:h-[325px]"
                        : "h-[160px] md:h-[200px] "
                        }`}
                      alt="..."
                    />
                  </div>
                  <div
                    className={`${index === 0
                      ? "col-span-12 md:col-span-4 flex flex-col justify-center px-6 py-5 md:py-0 md:px-[40px]"
                      : "col-span-12 px-6 py-5"
                      }`}
                  >
                    <p className="text-base font-semibold">
                      {blog?.title.slice(0, 50)}
                    </p>
                    {index === 0 && (
                      <p
                        ref={ref}
                        className={`card-text mt-4 blog-card blog-card-text`}
                        dangerouslySetInnerHTML={{
                          __html: quillToHTML(
                            blog?.contents[0]?.content &&
                            blog?.contents[0]?.content
                          ),
                        }}
                        style={{ fontSize: "16px", color: "#555555" }}
                      ></p>
                    )}
                    <button
                      onClick={() => handleReadMore(blog.slug)}
                      className={`text-primary text-left`}
                    >
                      Read More
                    </button>
                  </div>
                </div>
                {/* {index + 1} */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BlogCommon;
