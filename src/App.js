import "./App.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useLocation, useHistory } from "react-router-dom";

import Header from "./front-end/common/Header";
import Footer from "./front-end/common/Footer";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartList } from "./store/Slices/cart/cartsSlice";
import Echo from "laravel-echo";
import io from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { onMessageListener, getToken } from "./firebaseInit";
// import Notifications from './components/notification/Notifications';
import ReactNotificationComponent from "./components/notification/ReactNotification";
import axios from "axios";
import { HOST, React_APP_FACEBOOK_APP_AD } from "./constants";
import { getMessaging, onMessage } from "firebase/messaging";
import Routes from "./Routes";
import { LoginContext, MapLoadedApiContext } from "./helper/context";
import { ReactSwal } from "./helper/swal";
import { handleBackendEvents } from "./helper/backend-events";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { QueryClient, QueryClientProvider } from "react-query";
// import { useJsApiLoader } from "@react-google-maps/api";
import ReactPixel from "react-facebook-pixel";
import { setAllCountry } from "./store/Slices/countryslice/allCountrySlice";
import {
  changeCountry,
  changeCountryId,
  changePlaceId,
  changeZipCode,
} from "./store/Slices/countryslice/countryslice";
import { setPartners } from "./store/Slices/partners/partnersSlice";

const stripePromise = loadStripe(process.env.React_APP_STRIPE_PUBLIC_KEY);
const paypalClientID = process.env.REACT_APP_PAYPAL_CLIENT_ID;
window.io = io;

const liveOption = {
  host: process.env.REACT_APP_API_BASE_URL, //"https://api.farenow.com",
  broadcaster: "socket.io",
};
const localOption = {
  host: "http://127.0.0.1:6001",
  broadcaster: "socket.io",
  client: io,
  authEndpoint: "/broadcasting/auth",
};

if (typeof window.io != "undefined") {
  window.Echo = new Echo(liveOption);
}

window.fbAsyncInit = function () {
  window.FB.init({
    appId: process.env.REACT_APP_FACEBOOK_APP_ID,
    cookie: true,
    xfbml: true,
    version: "v17.0",
  });

  window.FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

const advancedMatching = { em: "some@email.com" }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
const options = {
  autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
  debug: false, // enable logs
};
ReactPixel.init(React_APP_FACEBOOK_APP_AD, advancedMatching, options);
// ReactPixel.pageView();

const stripeElementsAppearance = {
  theme: "night",

  variables: {
    colorPrimary: "#0570de",
    colorBackground: "#ffffff",
    colorText: "#30313d",
    colorDanger: "#df1b41",
    fontFamily: "Ideal Sans, system-ui, sans-serif",
    fontSizeBase: "24px",
    spacingUnit: "2px",
    borderRadius: "4px",
    // See all possible variables below
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [notification, setNotification] = useState();
  const [state, setState] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [country, setCountry] = useState(null);

  const { hash, pathname } = useLocation();
  const history = useHistory();

  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    setNotification(payload);
  });

  useEffect(() => {
    if (window.google && "maps" in window.google) {
      setIsLoaded(window.google.maps.version);
    } else {
      setIsLoaded(false);
    }
  }, [window.google]);

  const handleMessageClick = (data) => {
    setState(data);
  };

  const dispatch = useDispatch();

  const [allcountries, setAllCountries] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/countries`)
      .then((response) => {
        setAllCountries(response.data);
        dispatch(setAllCountry(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/get-partner`)
      .then((response) => {
        dispatch(setPartners(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_MAP_API}`
        );
        if (data.location) {
          const response = await axios.post(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.location.lat},${data.location.lng}&key=${process.env.REACT_APP_GOOGLE_MAP_API}`
          );
          const results = response?.data?.results;
          if (results.length > 0) {
            const addressComponents = results[0].address_components;
            for (const component of addressComponents) {
              if (component.types.includes("postal_code")) {
                dispatch(changeZipCode(component.long_name));
              }
            }
            dispatch(changePlaceId(results[0].place_id));
          }
          const countryCode =
            response.data.results[
              results.length - 1
            ].address_components[0].short_name.toLowerCase();
          dispatch(changeCountry(countryCode));
          setCountry(countryCode);
        }
      } catch (e) {
        setCountry("ng");
        dispatch(changeCountry("ng"));
      }
    })();
  }, []);
  useEffect(() => {
    if (allcountries && country) {
      for (let index = 0; index < allcountries.length; index++) {
        const element = allcountries[index];
        if (
          pathname === "/"
          // pathname === "/ng" ||
          // pathname === "/ke" ||
          // pathname === "/gh" ||
          // pathname === "/za"
        ) {
          if (element.iso2.toLowerCase() === country) {
            localStorage.setItem("country", element.id);
            dispatch(changeCountryId(element.id));
            if (pathname !== "/" && country === "ng") {
              history.push(`/`);
            } else if (pathname !== "/" && country !== "ng") {
              history.push(`/${country}`);
            } else if (pathname === "/" && country !== "ng") {
              history.push(`/${country}`);
            }
            break;
          } else {
            // set for Nigeria
            if (element.is_default) {
              localStorage.setItem("country", element.id);
              dispatch(changeCountryId(element.id));
              history.push(`/${element.iso2.toLowerCase()}`);
            }
          }
        } else {
          if (element.iso2.toLowerCase() === pathname.split("/")[1]) {
            localStorage.setItem("country", element.id);
            dispatch(changeCountryId(element.id));
          } else {
            if (element.is_default) {
              localStorage.setItem("country", element.id);
              dispatch(changeCountryId(element.id));
            }
          }
        }
      }
    }
  }, [allcountries, country]);

  useEffect(() => {
    (async () => {
      handleBackendEvents(dispatch);
      if (!!localStorage?.userToken) {
        const token = await getToken();
        axios({
          method: "post",
          headers: {
            Authorization: `${localStorage.userToken}`,
          },
          url: `${HOST}/api/user/device-token`,
          data: { device_token: token },
        })
          .then(function (response) {})
          .catch((error) => {
            // console.log(error.response.data.message);
          });
        dispatch(getCartList());
      }
    }).call();
  }, []);

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        // const position = element.getBoundingClientRect().top;
        if (element) {
          element.scrollIntoView({
            // position: position + window.scrollY - 20,
            behavior: "smooth",
          });
        }
      }, 0);
    }
  }, [hash]); // do this on route change

  useEffect(() => {
    /*if (
      !!localStorage?.user_data == true &&
      !!localStorage?.userToken == true
    ) {
       window.addEventListener("click", () => {
        if (localStorage?.user_data) {
          let user = JSON.parse(localStorage?.user_data);
          if (!!!user.phone || !user.phone_verification) {
            location?.pathname != "/verification" &&
              history.push({
                pathname: "/verification",
                state: {
                  verification: {
                    email: user?.email,
                    phone: !!user.phone && user?.phone,
                    verified: !!user?.phone_verification,
                  },
                },
              });
          }
        }
      }); 
    }*/
    if (!!localStorage.userToken) {
      // window.Echo.connector.options.auth.headers['Authorization'] = localStorage.userToken;
      // window.Echo.connector.options.auth.headers['Accept'] = 'application/json';
      setIsLoggedIn(true);
    } else {
      // window.Echo.connector.options.auth.headers['Authorization'] = '';
      localStorage.clear();
      setIsLoggedIn(false);
    }
  }, [localStorage?.user_data, localStorage?.user_data]);

  return (
    <Elements
      stripe={stripePromise}
      options={{ appearance: stripeElementsAppearance }}
    >
      <PayPalScriptProvider options={{ "client-id": paypalClientID }}>
        <LoginContext.Provider value={isLoggedIn}>
          <QueryClientProvider client={queryClient}>
            <MapLoadedApiContext.Provider value={isLoaded}>
              <div className="App">
                {/* {JSON.parse(localStorage.getItem('user_data'))?.device_token ? null : <Notifications /> } */}
                <ReactNotificationComponent
                  {...notification}
                  handleMessageClick={handleMessageClick}
                />
                <Header notification={state}></Header>
                <section className="bg-gray-50 text-base">
                  <Routes />
                </section>
                <Footer />
                <div className="rem-1-5">
                  <ToastContainer
                    className={"text-sm w-[42rem]"}
                    autoClose={5000}
                    position={toast.POSITION.TOP_CENTER}
                  />
                </div>
              </div>
            </MapLoadedApiContext.Provider>
          </QueryClientProvider>
        </LoginContext.Provider>
      </PayPalScriptProvider>
    </Elements>
  );
}

export default App;
