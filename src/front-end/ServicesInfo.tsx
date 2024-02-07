import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Redirect, useParams } from "react-router-dom";
import { RootState } from "store";
import Loading from "front-end/common/Loading";
import clsx from "clsx";
import LocationInput from "components/input.location";
import {
  getServiceQuestion,
  ServiceState,
} from "../store/Slices/services/ServiceSclice";
import { Helmet } from "react-helmet";
import ServiceWizard from "./Services/services.wizard";
import { HOST } from "../constants";
import axios from "axios";

export interface IServicesInfoProps {}

export default function ServicesInfo(props: IServicesInfoProps) {
  // console.log("stname", stName);
  // let { service, subService,stName } = useParams<{ service: string, subService: string }>();
  let { iso, service, subService, stName } = useParams<{
    iso: string;
    service: string;
    subService: string;
    stName: string;
  }>();
  const services = useSelector<RootState, IMenu[]>(
    (state) => state.headerMenuReducer
  );
  const allCountry = useSelector<RootState>(
    (state) => state.allCountryReducer.countries
  );
  // console.log('services ===>', services)
  // console.log('subServices ====>', subService)
  // console.log("service ====>",service)

  service = service.toLowerCase();
  // console.log("servicelnk ====>",service)
  subService = subService.toLowerCase();

  const matchingService = services.find(
    (s) => s.name.toLowerCase().replace(" ", "-") == service
  );
  // console.log('matchService =====>', matchingService)
  const matchingSubService = matchingService?.sub_services.find(
    (s) =>
      s.name.replace(/[' ']/g, "-").replace("/", "-").toLowerCase() ==
      subService
  );
  // console.log(`matchingSubService`, matchingSubService);

  // service = service.toLowerCase();
  // subService = subService.toLowerCase();
  // // const matchingService = services.find(s => s.name.toLowerCase().replace(" ", "-") == service);
  // // const matchingSubService = matchingService?.sub_services.find(s => s.name.replace(' ', '-').replace('/','-').toLowerCase()== subService);
  //   const matchingService = services.find(s => s.name.toLowerCase().replace(" ", "-") == service);
  //   console.log(`matchingService`, matchingService);
  // const matchingSubService = matchingService?.sub_services.find(s => s.name.replace(' ', '-').replace('/','-').toLowerCase()== subService);
  // console.log(`matchingSubService =======>`, matchingSubService);

  const _location = useLocation();
  const searchParams = new URLSearchParams(_location.search);
  const subServiceId = matchingSubService?.id;
  const serviceId = matchingService?.id;
  const [placeId, setPlaceId] = React.useState(
    searchParams.get("place_id") || ""
  );
  const zipCode = searchParams.get("zipCode") || "";
  // const country_id = allCountry?.find(
  //   (item) => iso === item.iso2.toLowerCase()
  // );
  // alert(placeId);
  const history = useHistory();
  const dispatch = useDispatch();
  const serviceData = useSelector<RootState, ServiceState>(
    (state) => state.service
  );

  // console.log("++++++++++++++++++++++++++",serviceData?.data.service_contents);

  const [locationData, setLocationData] = React.useState<ILocation>();
  const [stateName, setStateName] = React.useState("");
  const [countryId, setCountryId] = useState("");

  useEffect(() => {
    if (Array.isArray(allCountry)) {
      for (let index = 0; index < allCountry.length; index++) {
        const element = allCountry[index];
        if (element.iso2.toLowerCase() === iso) {
          setCountryId(element.id);
        }
      }
    }
  }, [allCountry, iso]);

  const getPlaceId = async (stName) => {
    let city_name = stName; // State Name
    let key = process.env.React_APP_GOOGLE_API; // Google Api Key

    let query = `https://maps.googleapis.com/maps/api/geocode/json?address=${city_name}}&location_type=GEOMETRIC_CENTER&key=${key}&sensor=false`;
    await axios({
      method: "get",
      url: query,
    })
      .then((response) => {
        let data = response.data;
        setPlaceId(data["results"][0]["place_id"]);
      })
      .catch((error) => {
        let data = error.response.data;
        console.log("error", data);
      });
  };

  if (stName) getPlaceId(stName);

  const getProviders = () => {
    console.log("From Service Info");
    let url = `/service-providers?subService=${subServiceId}`;
    if (zipCode) url = url + `&zipCode=${zipCode}`;
    if (placeId) url = url + `&place_id=${placeId}`;
    if (countryId) url = url + `&country_id=${countryId}`;
    history.push(url);
  };
  React.useEffect(() => {
    dispatch(getServiceQuestion(subServiceId));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [subServiceId]);
  const locationSection = (
    <div className={clsx(["rounded-[32px] bg-white p-16 text-center shadow"])}>
      <div className="max-w-[60rem] mx-auto my-12 space-y-16">
        <div className="text-[4rem] font-medium">Enter your location</div>
        <LocationInput
          placeholder="Enter your location"
          onChange={(value) => {
            setLocationData({ placeId: value.value });
            setStateName(value["address_components"][0]["long_name"]);
          }}
          defaultValue={zipCode}
        />
        <button
          className="fare-btn fare-btn-primary fare-btn-lg"
          disabled={!locationData}
          onClick={() => {
            history.push(
              `/${iso}/${service}/${subService}/${stateName
                .toLowerCase()
                .replace(" ", "-")}?${_location.search}&zipCode=${stateName}`
            );
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );

  let meta;
  if (serviceData?.data) {
    meta = (
      <Helmet>
        <title>Farenow - {serviceData?.data?.name}</title>
        <meta name="description" content={serviceData?.data.terms} />
        <meta property="og:title" content={serviceData?.data.name} />

        {serviceData?.data?.service_contents.map((content) => (
          <meta property="og:description" content={content.description} />
        ))}
        {serviceData?.data?.service_contents.map((content) => (
          <meta property="og:image" content={content.image} />
        ))}
      </Helmet>
    );
  }

  const loading = !services || services.length <= 0;
  if (loading)
    return <Loading loading backdrop={false} className={"h-[40rem]"} />;
  if (matchingSubService?.id)
    return (
      <>
        {meta}
        <div className="container py-32">
          {serviceData?.loading && (
            <Loading loading={true} backdrop={false} className="h-[24rem]" />
          )}
          {!serviceData?.loading && !placeId && locationSection}
          {placeId && serviceData?.data && (
            <ServiceWizard
              service={serviceData.data}
              onComplete={getProviders}
            />
          )}
          <br />
          <div className="row">
            <div className="col-2"></div>
            <div className="col-6">
              <div className="font-bold text-3xl text-dark tracking-[-2px] leading-tight">
                <h1>{serviceData?.data?.name}</h1>
              </div>
            </div>
          </div>
          {serviceData?.data?.service_contents.map((content, index) => (
            <div className="row">
              <div className="col-2"></div>
              {index % 2 === 0 && (
                <div
                  className="col-4"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="text-xl md:text-base text-dark mt-6 px-8">
                    <span>{content.description}</span>
                  </div>
                </div>
              )}
              <div
                className="col-4"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={(content.image && HOST + content.image) || ""}
                  loading="lazy"
                  className="img-fluid"
                  alt=""
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/assets/img/service1.jpg";
                  }}
                />
              </div>
              {index % 2 === 1 && (
                <div
                  className="col-4"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="text-xl md:text-base text-dark mt-6 px-8">
                    <span>{content.description}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  return <Redirect to={"/404"} />;
}
