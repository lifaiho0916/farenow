import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { HOST } from "../../constants";

function StateListFooter() {
  const [show, setShow] = React.useState(false);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const country_id = useSelector((state) => state.countryReducer.countryId);
  const allCountry = useSelector((state) => state?.allCountryReducer);

  const toggle = () => {
    setShow((show) => !show);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios
          .get(`${HOST}/api/country-wise-state/${country_id}`)
          .then((res) => {
            const sortedData = res.data.states.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            setStates(sortedData);
          });
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [country_id]);
  return (
    <section className="container max-w-[1170px] pt-20 pb-0 lg:pt-20 lg:pb-20">
      {!loading && (
        <>
          <h2 className="text-[20px] lg:text-[24px] font-bold mb-20 lg:ml-4">
            Cities where we work - Farenow
          </h2>
          <div className="w-full mb-16 lg:mb-24">
            <div className="flex items-center justify-center">
              <div className="rounded-full w-full lg:w-[700px] bg-primary-light d-flex items-center p-3">
                <img
                  src="/assets/img/icon-map-marker.svg"
                  class="ml-6 mr-1 mb-1 w-8 h-8"
                  alt="location"
                />
                <input
                  className="text-sm border-none bg-transparent outline-none w-full px-2"
                  placeholder="Search by Zip code"
                />
                <button className="fare-btn fare-btn-primary rounded-full whitespace-nowrap">
                  Check Availability
                </button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:columns-4 xl:columns-5">
            <img src="/assets/img/earth.png" class="w-full" alt="earth" />
            {states &&
              states.map((state) => (
                <div className="lg:ml-40 xl:ml-32 break-inside-avoid w-full">
                  <ul>
                    <>
                      <li className="footer-state-list">{state.name}</li>
                      {state.cities &&
                        state.cities.map((city) => (
                          <li className="footer-region-list">
                            <Link to="/">{city.name}</Link>
                          </li>
                        ))}
                    </>
                  </ul>
                </div>
              ))}
            <div className="lg:ml-40 xl:ml-32 break-inside-avoid w-full">
              <p className="footer-state-list">Other Countries</p>
              {allCountry.countries.map((country) => (
                <ul>
                  <li className="footer-region-list">
                    <Link to="/">{country.name}</Link>
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <div className="lg:hidden">
            <div className="text-center mb-16">
              <img
                src="/assets/img/earth.png"
                class="inline-block mt-6"
                alt="earth"
              />
            </div>
            <div>
              <div>
                <hr className="bg-primary" />
                <div
                  onClick={toggle}
                  className="relative flex items-center justify-center py-8"
                >
                  <h2 className="text-primary text-[16px]">
                    Farenow Locations
                  </h2>
                  <button className="text-primary absolute right-1 top-0 bottom-0 my-auto">
                    <i className={`la la-${show ? "minus" : "plus"}`}></i>
                  </button>
                </div>
                <hr className="bg-primary" />
                <div className="mt-10">
                  {show && (
                    <div className="columns-2">
                      {states &&
                        states.map((state) => (
                          <div className="w-auto break-inside-avoid">
                            <ul>
                              <>
                                <li className="footer-state-list">
                                  {state.name}
                                </li>
                                {state.cities &&
                                  state.cities.map((city) => (
                                    <li className="footer-region-list-mobile">
                                      <Link to="/">{city.name}</Link>
                                    </li>
                                  ))}
                              </>
                            </ul>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default StateListFooter;

