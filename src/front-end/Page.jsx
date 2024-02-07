import { useState, useEffect, useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import Loading from "./common/Loading";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { constant } from "lodash";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

export const Page = (props) => {
  const [state, setState] = useState({});
  const [metaData, setMetaData] = useState([]);
  const [page, setPage] = useState({});
  let myPages = {
    articles: "Articles",
    "about-us": "About",
    "privacy-policy": "Policy",
    "terms-conditions": "Terms And Condition",
    "contact-us": "Contact",
  };
  const params = useParams();

  const { name } = params;

  const pages = useSelector((state) => state?.footerReducer?.pages);
  let allPages = [];
  for (let index = 0; index < pages?.data?.length; index++) {
    const element = pages.data[index];
    const newElement = {
      ...element,
      slug: element?.name.toLowerCase().replace(/\s+/g, "-"),
    };
    allPages.push(newElement);
  }
  useEffect(() => {
    const page = allPages?.find((page) => page.slug === name);
    setPage(page);
  }, [pages.data]);
  useEffect(() => {
    if (name && page?.content) {
      const converter = new QuillDeltaToHtmlConverter(
        JSON.parse(page?.content)?.ops
      );
      setState({
        ...state,
        title: page?.title,
        content: converter.convert(),
      });
    }
  }, [name, page?.title]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/seos`)
      .then((res) => setMetaData(res.data));
  }, []);
  const metaInfo = metaData?.data?.find(
    (meta) => meta.page_name === myPages[name]
  );

  let meta;
  if (metaInfo) {
    meta = (
      <Helmet>
        <title>Farenow - {metaInfo?.page_name}</title>
        <meta
          property="og:description"
          content={`${metaInfo?.og_description}`}
        />
        <meta property="og:title" content={metaInfo?.og_title} />
        <meta property="og:image" content={metaInfo?.og_image} />
      </Helmet>
    );
  }

  return (
    <div>
      {meta}
      <div className="container py-16">
        <Loading loading={pages.loading}></Loading>
        <div className="fare-card">
          {/* <h1>{state?.title}</h1> */}
          <hr className="my-3" />
          <div className="text-sm px-6">
            {!!state?.content && <Content {...{ content: state?.content }} />}
            {pages.error && <div className="order-num">Not Found Data</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const Content = ({ content }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.innerHTML = content;
  }, [content]);

  return (
    <>
      <p ref={ref} className="Features" style={{ textAlign: "justify" }}></p>
    </>
  );
};
