import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { HOST } from "../constants";
import Loading from "./common/Loading";

const Help = () => {
  // const { isLoading, error, data } = useQuery("help", async () => {
  //   return (await axios.get(`${HOST}/api/help-pages?country_id=${country_id}`))
  //     .data;
  // });
  const [help, setHelp] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const country_id = useSelector((state) => state.countryReducer.countryId);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${HOST}/api/help-pages?country_id=${country_id}`)
      .then((res) => {
        setHelp(res.data.pages);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, [country_id]);
  return (
    <>
      <Loading loading={isLoading}></Loading>
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          minHeight: "100px",
          width: "70%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "30px",
          marginTop: "30px",
        }}
      >
        {help[0]?.description ? (
          <div
            dangerouslySetInnerHTML={{ __html: help[0]?.description }}
            style={{ color: "black", textAlign: "center", padding: "16px" }}
          ></div>
        ) : (
          <div>No Help Available</div>
        )}
      </div>
    </>
  );
};

export default Help;
