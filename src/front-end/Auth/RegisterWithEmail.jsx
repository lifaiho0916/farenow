import React, { useState, useEffect, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { HOST, React_APP_FACEBOOK_APP_AD } from "../../constants";
import OTPVerifyInput from "./OTPVerifyInput";
import CommonInput from "../../components/input.common";
import ReactPixel from "react-facebook-pixel";
import LocationInput from "../../components/input.location";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const RegisterWithEmail = (props) => {
  const { history } = props;
  const [location, setLocation] = React.useState();
  const [phone, setPhone] = useState();
  const [passwordErr, setPasswordErr] = useState(false);
  const divGoogle = useRef(null);
  const country_id = useSelector((state) => state.countryReducer.countryId);

  const [state, setState] = useState({
    isLoading: false,
    otpLoading: false,
    values: {
      first_name: "",
      last_name: "",
      email: "",
      zip_code: "",
      password: "",
      password_confirmation: "",
      country_id: country_id,
      phone: "",
      address: "",
    },
    errors: {},
    step: 1,
    timeLeft: 30,
    send: false,
    otpMessage: "",
    errorMessage: "",
  });

  const countdown = () => {
    setState({ ...state, otpLoading: true, send: true });
    let timeLeft = 29;
    let timerId = setInterval(() => {
      if (timeLeft == 0) {
        clearTimeout(timerId);
        setState((prevState) => ({
          ...prevState,
          timeLeft: 29,
          send: false,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          timeLeft: timeLeft--,
        }));
      }
    }, 1000);
    axios({
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/api/user/signup/email",
      data: state.values,
    })
      .then(function (response) {
        setState((prevState) => ({
          ...prevState,
          otpMessage: "OTP sent successfully",
          otpLoading: false,
        }));
      })
      .catch((error) => {
        //handle error
        if (error.response && error.response.data["error"]) {
          setState((state) => ({
            ...state,

            errors: {
              ...(state.errors = error.response.data.message),
            },
          }));
        }
        setState((prevState) => ({
          ...prevState,
          otpLoading: false,
        }));
      });
  };

  useEffect(() => {
    if ((localStorage.userToken, localStorage.userToken)) {
      history.push("/dashboard");
    }
  }, [localStorage.userToken, localStorage.userToken]);

  useEffect(() => {
    if (phone?.length < 10 || phone?.length > 15) {
      setState((state) => ({
        ...state,
        errors: {
          ...state.errors,
          phone: "Please enter a valid phone number between 10 to 15 digits.",
        },
      }));
    } else {
      setState((state) => ({
        ...state,
        values: {
          ...state.values,
          phone: phone,
        },
        errors: {
          ...state.errors,
          phone: "",
        },
      }));
    }
  }, [phone]);
  const handleChange = (event) => {
    event.persist();
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>?]/;
    const minLengthRegex = /^.{8,}$/;

    if (
      event.target.name === "password" ||
      event.target.name === "password_confirmation"
    ) {
      const hasUppercase = uppercaseRegex.test(event.target.value);
      const hasLowercase = lowercaseRegex.test(event.target.value);
      const hasDigit = digitRegex.test(event.target.value);
      const hasSpecialChar = specialCharRegex.test(event.target.value);
      const minLength = minLengthRegex.test(event.target.value);
      if (
        hasUppercase &&
        hasLowercase &&
        hasDigit &&
        hasSpecialChar &&
        minLength
      ) {
        setPasswordErr(false);

        setState((state) => ({
          ...state,
          values: {
            ...state.values,
            [event.target.name]: event.target.value,
          },
          errors: {
            ...state.errors,
            [event.target.name]: "",
          },
        }));
      } else {
        setPasswordErr(true);
        setState((state) => ({
          ...state,
          values: {
            ...state.values,
            [event.target.name]: event.target.value,
          },
          errors: {
            ...state.errors,
            [event.target.name]:
              "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
          },
        }));
      }
    } else if (event.target.name === "phone") {
      if (event.target.value.length >= 10 && event.target.value.length <= 15) {
        setState((state) => ({
          ...state,
          values: {
            ...state.values,
            [event.target.name]: event.target.value,
          },
          errors: {
            ...state.errors,
            [event.target.name]: "",
          },
        }));
      } else {
        setState((state) => ({
          ...state,
          values: {
            ...state.values,
            [event.target.name]: event.target.value,
          },
          errors: {
            ...state.errors,
            [event.target.name]:
              "Please enter a valid phone number between 10 to 15 digits.",
          },
        }));
      }
    } else {
      setState((state) => ({
        ...state,
        values: {
          ...state.values,
          [event.target.name]: event.target.value,
        },
        errors: {
          ...state.errors,
          [event.target.name]: "",
        },
      }));
    }
  };
  const handleOptChange = (optCodes) => {
    setState((state) => ({
      ...state,
      values: {
        ...state.values,
        otp: optCodes,
      },
    }));
  };

  const handleEmailSignUp = (event) => {
    !!event && event.preventDefault();
    setState((state) => ({
      ...state,
      isLoading: true,
    }));
    const { email } = state.values;
    const hiddenEmail =
      email.substring(0, 2) + "****" + email.substring(email.lastIndexOf("@"));
    axios({
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/api/user/signup/email",
      data: state.values,
    })
      .then(function (response) {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          step: 2,
          values: {
            ...state.values,
            otp: "",
          },
          otpMessage: `We have sent a verification code to your email at ${hiddenEmail}`,
        }));
      })
      .catch((error) => {
        //handle error
        if (error.response && error.response.data["error"]) {
          setState((state) => ({
            ...state,
            errors: {
              ...(state.errors = error.response.data.message),
            },
          }));
        }
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      });
  };

  const handleOtpSignUp = (event) => {
    event.preventDefault();
    setState((state) => ({
      ...state,
      isLoading: true,
    }));

    axios({
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/api/user/signup/email/verify",
      data: {
        email: state.values.email,
        otp: state.values.otp,
      },
    })
      .then(function (response) {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          step: 3,
        }));
      })
      .catch((error) => {
        //handle error
        if (error.response && error.response.data["error"]) {
          setState((state) => ({
            ...state,
            errors: {
              ...(state.errors = error.response.data.message),
            },
          }));
        }
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      });
  };

  useEffect(() => {
    setState((state) => ({
      ...state,
      values: {
        ...state.values,
        address: location && location.label,
      },
      isLoading: false,
    }));
  }, [location]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setState((state) => ({
      ...state,
      isLoading: true,
    }));
    await axios({
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/api/user/signup",
      data: state.values,
    })
      .then(function (response) {
        const data = response.data.data;
        ReactPixel.trackCustom("signUp", {
          email: data.email,
        });
        localStorage.setItem("userToken", data.auth_token);
        localStorage.setItem("user_data", JSON.stringify(data.user));
        history.push("/dashboard");
      })
      .catch((error) => {
        //handle error
        if (error.response && error.response.data["error"]) {
          setState((state) => ({
            ...state,
            errors: {
              ...(state.errors = error.response.data.message),
            },
          }));
        }
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      });
  };

  const hasError = (field) => (state.errors[field] ? true : false);

  useEffect(() => {
    if (divGoogle.current) {
      window.google?.accounts?.id?.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: ({ credential }, error) => {
          if (credential) {
            setTokenData({ token: credential, provider: "google" });
            handleSocialLogin({
              provider: "google",
              token: credential,
            });
          }
        },
      });

      const r = window.google?.accounts?.id?.renderButton(divGoogle.current, {
        type: "standard",
        width: "200px",
        theme: "filled_blue",
        size: "large",
        text: "signin_with",
        logo_alignment: "left",
        shape: "pill",
      });

      tokenClient.current = window.google?.accounts?.oauth2?.initTokenClient({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/contacts.readonly",
        prompt: "select_account", // '' | 'none' | 'consent' | 'select_account'
        callback: (data, error) => {
          const { access_token } = data;
          if (access_token) {
            setTokenData({
              token: access_token,
              provider: "google",
            });
            handleSocialLogin({
              provider: "google",
              token: access_token,
            });
          }
        }, // your function to handle the response after login. 'access_token' will be returned as property on the response
      });
    }
  }, [divGoogle.current]);

  const handleSocialLogin = async ({ provider, token }) => {
    await axios({
      method: "post",
      url: `${HOST}/api/user/login/${provider}/callback`,
      data: {
        token,
      },
    })
      .then(function ({ data }) {
        setState((state) => ({
          ...state,
          socialLoading: false,
          socialError: "",
        }));
        localStorage.setItem("userToken", data.data.auth_token);
        localStorage.setItem("user_data", JSON.stringify(data.data.user));
        if (provider === "facebook") {
          window.FB?.logout();
        }
        if (provider === "google") {
          window.google?.accounts?.id.disableAutoSelect();
        }
        gotoReturnUrl();
      })
      .catch(({ response }) => {
        setState((state) => ({
          ...state,
          socialLoading: false,
          socialError: response.data.message,
        }));
        if (provider === "facebook") {
          window.FB?.logout();
        }
        if (provider === "google") {
          window.google?.accounts?.id.disableAutoSelect();
        }
      });
  };

  const gotoReturnUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const returnUrl = searchParams.get("returnUrl");
    if (returnUrl) {
      const rUrl = new URL(decodeURIComponent(returnUrl));
      history.push({
        pathname: rUrl.pathname,
        search: rUrl.search,
      });
    } else if (
      history.action === "POP" ||
      location?.state?.from == "forgot-password"
    ) {
      history.push("/dashboard");
    } else {
      history.goBack();
    }
  };

  const [tokenData, setTokenData] = useState(null);
  const tokenClient = useRef(null);

  return (
    <div className="login-sec d-flex align-items-center bg-gray-50">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="login-box h-auto mx-auto">
              <div className="login-heading text-center text-4xl">Sign up</div>
              <div
                className="text-center text-success"
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {state?.success &&
                  "Successfully registered. Please wait for the admin to approve your account."}
              </div>
              {(() => {
                switch (state.step) {
                  case 1:
                    return (
                      <div className="inner-box-log mx-auto">
                        <form onSubmit={handleEmailSignUp}>
                          <div className="common-input mb-5">
                            <label>Email Address</label>
                            <input
                              type="text"
                              name="email"
                              placeholder="Enter your email address"
                              required
                              value={state.values.email || ""}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p className="text-danger">
                              {hasError("email") ? state.errors.email : ""}
                            </p>
                          </div>
                          <button
                            type="submit"
                            className="fare-btn fare-btn-lg fare-btn-primary w-100 my-3"
                            disabled={state.isLoading}
                          >
                            Submit{" "}
                            {state.isLoading ? (
                              <i className="fas fa-spinner fa-spin ml-3"></i>
                            ) : (
                              ""
                            )}
                          </button>
                          <div className="other-login text-center mb-4">
                            or continue with
                          </div>
                          <div className="d-flex justify-center items-center gap-4 flex-wrap">
                            <button
                              className="rounded-pill bg-gray-100 border text-[1.6rem] px-12 py-2 hover:bg-gray-50 d-flex items-center"
                              onClick={() => {
                                window.FB?.login();
                              }}
                            >
                              <img
                                src="/assets/img/facebook.svg"
                                className="float-left"
                              />
                              &ensp; Facebook
                            </button>
                            <button
                              className="rounded-[16px] bg-gray-100 border text-base px-16 py-3 hover:bg-gray-50 d-none"
                              onClick={() => {
                                tokenClient.current?.requestAccessToken();
                              }}
                            >
                              <img
                                src="/assets/img/google.svg"
                                className="float-left"
                              />
                              &ensp; Google
                            </button>
                            <div
                              id="google-button"
                              ref={divGoogle}
                              // id="g_id_onload"
                              // data-client_id={
                              //     process.env
                              //         .REACT_APP_GOOGLE_CLIENT_ID
                              // }
                              // data-callback="handleCredentialResponse"
                              // data-auto_prompt="false"
                            ></div>
                          </div>
                        </form>

                        {/* <div className="other-login text-center">
                                                    OR
                                                </div> */}

                        {/* <button className="login-gmail mt-5">
                                                    Login with Google
                                                </button>
                                                <button className="login-facebook mt-5"> || ""
                                                    Login with Facebook
                                                </button> */}
                      </div>
                    );
                  case 2:
                    return (
                      <div className="inner-box-log mx-auto text-base">
                        <div className="text-center -mt-8 mb-8 text-gray-500">
                          {state?.otpMessage}
                        </div>
                        <form onSubmit={handleOtpSignUp}>
                          <div className="my-4">
                            <OTPVerifyInput
                              length={4}
                              onComplete={handleOptChange}
                            />
                          </div>
                          {/* <div className="common-input">
                            <input
                              type="text"
                              name="otp"
                              placeholder="OTP"
                              required
                              value={state.values.otp}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            <p className="text-danger">
                              {hasError("otp") ? state.errors.otp : ""}
                            </p>
                          </div> */}
                          <div className="item show-all rem-1-5 text-center my-3">
                            {state?.timeLeft > 0 && state?.timeLeft < 29 ? (
                              <span className="rem-1-5 m-2 text-base">
                                Resent after {state?.timeLeft} seconds
                              </span>
                            ) : (
                              <a
                                className="btn-link m-2 text-base"
                                onClick={countdown}
                              >
                                Resend Code
                              </a>
                            )}
                          </div>
                          <button
                            type="submit"
                            className="fare-btn fare-btn-primary fare-btn-lg  w-100 my-3"
                            disabled={state.isLoading}
                          >
                            Submit{" "}
                            {state.isLoading ? (
                              <i className="fas fa-spinner fa-spin ml-3"></i>
                            ) : (
                              ""
                            )}
                          </button>
                        </form>
                      </div>
                    );
                  case 3:
                    return (
                      <form onSubmit={handleSignUp}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="common-input mb-5">
                              <label>First Name</label>
                              <input
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                value={state.values.first_name}
                                onChange={handleChange}
                              />
                              <p className="text-danger">
                                {hasError("first_name")
                                  ? state.errors.first_name
                                  : ""}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="common-input mb-5">
                              <label>Last Name</label>
                              <input
                                type="text"
                                placeholder="Last Name"
                                name="last_name"
                                value={state.values.last_name}
                                onChange={handleChange}
                              />
                              <p className="text-danger">
                                {hasError("last_name")
                                  ? state.errors.last_name
                                  : ""}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="common-input mb-5">
                              <label>Email Address</label>
                              <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={state.values.email}
                                onChange={handleChange}
                              />
                              <p className="text-danger">
                                {hasError("email") ? state.errors.email : ""}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="common-input mb-5">
                              <label>Phone Number</label>
                              <PhoneInput
                                defaultCountry="NG"
                                placeholder="Enter phone number"
                                name="phone"
                                value={state.values.phone}
                                onChange={setPhone}
                              />
                              <p className="text-danger">
                                {hasError("phone") ? state.errors.phone : ""}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="common-input mb-5">
                              <label>Address</label>
                              <LocationInput
                                isAddress={true}
                                onChange={(v) => {
                                  setLocation(v);
                                }}
                                placeholder="Enter address"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <CommonInput
                              label="Password"
                              type="password"
                              placeholder="Password"
                              name="password"
                              value={state.values.password}
                              onChange={handleChange}
                              error={
                                hasError("password")
                                  ? state.errors.password
                                  : ""
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <CommonInput
                              label="Confirm Password"
                              type="password"
                              placeholder="Confirm Password"
                              name="password_confirmation"
                              value={state.values.password_confirmation}
                              onChange={handleChange}
                              error={
                                hasError("password_confirmation")
                                  ? state.errors.password_confirmation
                                  : ""
                              }
                            />
                          </div>
                          <div className="col-md-12">
                            <button
                              type="submit"
                              className="fare-btn fare-btn-lg  fare-btn-primary w-100 my-3"
                              disabled={
                                state.isLoading || state?.success || passwordErr
                              }
                            >
                              Submit{" "}
                              {state.isLoading ? (
                                <i className="fas fa-spinner fa-spin ml-3"></i>
                              ) : (
                                ""
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    );
                  default:
                    return "";
                }
              })()}
              <div className="text-sm my-4 text-center">
                Already have account? &ensp;
                <Link to="/login" className="btn-link">
                  Login
                </Link>
              </div>
              <hr className="my-4 mx-8" />
              <div className="text-[1.6rem] text-gray-400 text-center px-8">
                By signing and clicking Get a Price, you affirm you have read
                and agree to the Farenow Terms, and you agree and authorize
                Farenow and its affiliates, and their networks of service
                professionals, to deliver marketing calls or texts using
                automated technology to the number you provided above regarding
                your project and other home services offers. Consent is not a
                condition of purchase.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RegisterWithEmail);
