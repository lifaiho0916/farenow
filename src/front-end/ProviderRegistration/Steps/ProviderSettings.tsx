// import React, { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import RadioBoxButton from "../../../components/button.radio";
// import CommonInput from "../../../components/input.common";
// import { RootState } from "../../../store";
// import { clsx } from "clsx";
// import CheckBoxButton from "../../../components/button.checkbox";
// import LocationInput from "../../../components/input.location";

// export const ProviderSettingSection: React.FC<
//   React.PropsWithChildren<{ title: string; subTitle: string }>
// > = (props) => {
//   const { title, subTitle, children } = props;
//   return (
//     <div className="flex flex-col gap-8 w-100">
//       <h1 className="text-[2.8rem] font-bold">{title}</h1>
//       <p className="text-sm text-gray-400">{subTitle}</p>
//       {children}
//     </div>
//   );
// };
// type RoleType = "Individual" | "Business";
// export interface IProviderSettings {
//   first_name: string;
//   last_name: string;
//   address: string;
//   zip_code: {
//     zipCode: number;
//     place_id: string;
//     formatted_address: string;
//   }[];
//   spend_each_month: string;
//   type: RoleType;
//   services: {
//     serviceId: number;
//     subServiceIds: number[];
//   }[];
// }
// export interface IProviderSettingsProps {
//   setting?: IProviderSettings;
//   onComplete: (setting) => void;
// }

// export default function ProviderSettings(props: IProviderSettingsProps) {
//   const [, _refresh] = useState({});

//   const refresh = () => {
//     _refresh({});
//   };
//   const {
//     register,
//     getValues,
//     setValue,
//     getFieldState,
//     handleSubmit,
//     trigger,
//     formState: { errors },
//   } = useForm<IProviderSettings>({
//     mode: "onChange",
//     defaultValues: props.setting,
//   });

//   const headerMenu = useSelector<RootState, IMenu[]>(
//     (state) => state.headerMenuReducer
//   );
//   const [step, setStep] = useState(0);
//   const NameSection = (
//     <ProviderSettingSection
//       title="Complete your account settings to get started."
//       subTitle="These information are confidential and will help our team to customize your experience. "
//     >
//       <div>
//         <CommonInput
//           {...register("first_name", {
//             required: true,
//           })}
//           label="First Name"
//           placeholder="Enter your first name"
//           error={errors.first_name && "First Name is required"}
//         />
//         <CommonInput
//           {...register("last_name", {
//             required: true,
//           })}
//           label="Last Name"
//           placeholder="Enter your last name"
//           error={errors.last_name && "Last Name is required"}
//         />
//       </div>
//     </ProviderSettingSection>
//   );
//   const spendArray = [1, 100, 500, 1000];
//   const SpendSection = (
//     <ProviderSettingSection
//       title="How much do you spend each month on online marketing"
//       subTitle="These information are confidential and will help our team to customize your experience. "
//     >
//       <div className="flex flex-col gap-4">
//         {spendArray.map((minSpend, index) => {
//           const text =
//             `$${minSpend} ` +
//             (index == spendArray.length - 1
//               ? `and above`
//               : `- $${spendArray[index + 1]}`);
//           return (
//             <RadioBoxButton
//               text={text}
//               shadow={false}
//               checked={text == getValues().spend_each_month}
//               onChange={() => {
//                 setValue("spend_each_month", text);
//               }}
//               className="py-4 bg-primary-light border-none rounded-3xl"
//             />
//           );
//         })}
//         <CommonInput
//           {...register("spend_each_month", {
//             required: true,
//           })}
//           type="hidden"
//           error={errors.spend_each_month && "Select one of the values."}
//         />
//       </div>
//     </ProviderSettingSection>
//   );
//   const roleNames: Record<RoleType, string> = {
//     Business: "Company",
//     Individual: "Individual",
//   };
//   const RoleSection = (
//     <ProviderSettingSection
//       title="Choose your role"
//       subTitle="Let’s help you find customers."
//     >
//       <div className="flex flex-col gap-4">
//         {["Individual", "Business"].map((role: RoleType, index) => {
//           return (
//             <RadioBoxButton
//               text={roleNames[role]}
//               shadow={false}
//               checked={role == getValues().type}
//               onChange={() => {
//                 setValue("type", role);
//               }}
//               className="py-4 bg-primary-light border-none rounded-3xl"
//             />
//           );
//         })}
//         <CommonInput
//           {...register("type", {
//             required: true,
//           })}
//           type="hidden"
//           error={errors.type && "Select one of the values."}
//         />
//       </div>
//     </ProviderSettingSection>
//   );
//   const [activeService, setActiveService] = useState<IMenu>();
//   const selectedServices =
//     getValues().services ||
//     headerMenu.map((m) => ({
//       serviceId: m.id,
//       subServiceIds: [],
//     }));
//   let { subServiceIds = [] } =
//     (activeService &&
//       selectedServices.find((s) => s.serviceId == activeService.id)) ||
//     {};
//   const checkboxChanged = (subService: ISubService, checked: boolean) => {
//     if (checked && !subServiceIds.includes(subService.id))
//       subServiceIds.push(subService.id);
//     if (!checked) {
//       let index = subServiceIds.findIndex((id) => id == subService.id);
//       if (index >= 0) subServiceIds.splice(index, 1);
//     }
//     setValue("services", [...selectedServices]);
//   };
//   const ServiceSection = (
//     <ProviderSettingSection
//       title="Choose service category"
//       subTitle="What is your line of work?"
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {headerMenu.map((service) => {
//           const count = selectedServices.find((s) => s.serviceId == service.id)
//             ?.subServiceIds.length;
//           return (
//             <button
//               className={clsx([
//                 "fare-btn",
//                 activeService?.id == service.id
//                   ? "fare-btn-primary"
//                   : "fare-btn-default text-gray-700",
//               ])}
//               onClick={() => setActiveService(service)}
//             >
//               {service.name}
//               {count > 0 && (
//                 <span className="badge badge-primary badge-pill mx-2">
//                   {count}
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </div>
//       <div className="grid grid-cols-1 gap-4">
//         {activeService?.sub_services.map((subService) => (
//           <CheckBoxButton
//             text={subService.name}
//             shadow={false}
//             onChange={(checked) => {
//               checkboxChanged(subService, checked);
//             }}
//             checked={subServiceIds.includes(subService.id)}
//           />
//         ))}
//       </div>
//       <p className="text-danger">
//         {!selectedServices.some((s) => s.subServiceIds.length > 0) &&
//           "Select one of the services."}
//       </p>
//     </ProviderSettingSection>
//   );

//   const getAddrDetail = (address: any) => {
//     const {
//       address_components,
//       value: place_id,
//       label: formatted_address,
//       zipCode,
//     } = address;
//     const postalCode = address_components?.find((address) => {
//       return address?.types?.includes("postal_code")
//         ? address?.long_name
//         : null;
//     });

//     const city = address_components?.find((address) => {
//       return address?.types?.includes("locality") ? address?.long_name : null;
//     });

//     const state = address_components?.find((address) => {
//       return address?.types?.includes("administrative_area_level_1")
//         ? address?.long_name
//         : null;
//     });

//     const country = address_components?.find((address) => {
//       return address?.types?.includes("country") ? address?.long_name : null;
//     });

//     return {
//       zipCode: postalCode?.long_name ?? state?.long_name,
//       city: city?.long_name,
//       state: state?.long_name,
//       country: country?.long_name,
//       place_id,
//       formatted_address,
//     };
//   };
//   const zipCode = getValues().zip_code || [];
//   const ZipCodeSection = (
//     <ProviderSettingSection title="Where do you work?" subTitle="">
//       <div>
//         <label>Zip Code</label>
//         <LocationInput
//           placeholder="Enter your zip code"
//           onChange={(value) => {
//             console.log(getAddrDetail(value));
//             setValue("zip_code", [...zipCode, getAddrDetail(value)]);

//             refresh();
//           }}
//         />
//         <div className="zip-code d-flex flex-wrap mt-4">
//           {zipCode?.map((zip, index) => (
//             <div
//               key={index}
//               className="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1"
//             >
//               {zip?.formatted_address}{" "}
//               <span
//                 className="la la-times ml-1"
//                 onClick={() => {
//                   setValue(
//                     "zip_code",
//                     zipCode.filter(
//                       (thisZip) => thisZip?.place_id !== zip?.place_id
//                     )
//                   );
//                   refresh();
//                 }}
//               ></span>
//             </div>
//           ))}
//         </div>
//         <p className="text-danger mt-2">
//           {!zipCode.length && "Zip code is required."}
//         </p>
//       </div>
//     </ProviderSettingSection>
//   );
//   const slides = [
//     NameSection,
//     SpendSection,
//     RoleSection,
//     ServiceSection,
//     ZipCodeSection,
//   ];
//   const slideValidateKeys: (keyof IProviderSettings)[][] = [
//     ["first_name", "last_name"],
//     ["spend_each_month"],
//     ["type"],
//     ["services"],
//     ["zip_code"],
//   ];

//   const onNext = async () => {
//     if (await trigger(slideValidateKeys[step])) {
//       setStep((step) => Math.min(slides.length - 1, step + 1));
//       if (step == slides.length - 1) {
//         props.onComplete(getValues());
//       }
//     }
//   };
//   const onPrev = async () => {
//     setStep((step) => Math.max(0, step - 1));
//   };
//   const handleForm = (value) => {};
//   return (
//     <div className="px-8 flex flex-col gap-4 relative">
//       <div className="text-xs px-4 py-2 bg-gray-100 text-primary rounded-pill absolute -top-[1rem] -right-[1rem]">
//         Step {step + 1} of {slides.length}
//       </div>
//       <div>
//         <span className="text-base text-primary-main">
//           Set up your business profile
//         </span>
//       </div>
//       <form onSubmit={handleSubmit(handleForm)} key={step}>
//         {slides.at(step)}
//       </form>
//       <button
//         type="button"
//         className="fare-btn fare-btn-lg fare-btn-primary"
//         onClick={onNext}
//       >
//         Next
//       </button>
//       <button
//         className="fare-btn fare-btn-lg fare-btn-default"
//         onClick={onPrev}
//       >
//         Previous
//       </button>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import RadioBoxButton from "../../../components/button.radio";
import CommonInput from "../../../components/input.common";
import { RootState } from "../../../store";
import { clsx } from "clsx";
import CheckBoxButton from "../../../components/button.checkbox";
import LocationInput from "../../../components/input.location";
import { useLocation } from "react-router-dom";
import { values } from "underscore";

export const ProviderSettingSection: React.FC<
  React.PropsWithChildren<{ title: string; subTitle: string }>
> = (props) => {
  const { title, subTitle, children } = props;
  return (
    <div className="flex flex-col gap-8 w-100">
      <h1 className="text-[2.8rem] font-bold">{title}</h1>
      <p className="text-sm text-gray-500">{subTitle}</p>
      {children}
    </div>
  );
};
type RoleType = "Individual" | "Business";

//chnage
type ServicesType = "Quotationbased" | "Hourlybased";
//end chnage
export interface IProviderSettings {
  first_name: string;
  last_name: string;
  phone: number;
  address: string;
  zip_code: {
    zipCode: number;
    place_id: string;
    formatted_address: string;
  }[];
  spend_each_month: string;
  type: RoleType;
  typeS: ServicesType;
  services: {
    serviceId: number;
    subServiceIds: number[];
  }[];
}
export interface IProviderSettingsProps {
  setting?: IProviderSettings;
  onComplete: (setting) => void;
}

export default function ProviderSettings(props: IProviderSettingsProps) {
  const [, _refresh] = useState({});

  const allCountry = useSelector((state: any) => state?.allCountryReducer);
  const [currency_symbol, setCurrencySymbol] = useState("₦");
  const location = useLocation();
  const [step, setStep] = useState(0);

  useEffect(() => {
    for (let index = 0; index < allCountry.countries.length; index++) {
      const element = allCountry.countries[index];
      if (element.id == localStorage.getItem("country")) {
        setCurrencySymbol(element?.currency_symbol);
      }
    }
  }, [allCountry]);

  const refresh = () => {
    _refresh({});
  };
  const {
    register,
    getValues,
    setValue,
    getFieldState,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<IProviderSettings>({
    mode: "onChange",
    defaultValues: props.setting,
  });
  // useEffect(() => {
  //   if (location.pathname !== "/provider/registration") {
  //     reset();
  //     setStep(1);
  //   }
  // }, [location.pathname]);

  const headerMenu = useSelector<RootState, IMenu[]>(
    (state) => state.headerMenuReducer
  );

  const NameSection = (
    <ProviderSettingSection
      title="Complete your account settings to get started."
      subTitle="These information are confidential and will help our team to customize your experience. "
    >
      <div>
        <CommonInput
          {...register("first_name", {
            required: true,
          })}
          label="First Name"
          placeholder="Enter your first name"
          error={errors.first_name && "First Name is required"}
          style={{ fontWeight: "500", color: "black" }}
        />
        <CommonInput
          {...register("last_name", {
            required: true,
          })}
          label="Last Name"
          placeholder="Enter your last name"
          error={errors.last_name && "Last Name is required"}
          style={{ fontWeight: "500", color: "gray" }}
        />
        <CommonInput
          {...register("phone", {
            required: {
              value: true,
              message: "Phone number is required",
            },
            minLength: {
              value: 10,
              message:
                "Please enter a valid phone number between 10 to 15 digits.",
            },
            maxLength: {
              value: 15,
              message:
                "Please enter a valid phone number between 10 to 15 digits.",
            },
          })}
          label="Phone Number"
          placeholder="Enter your phone number"
          error={errors.phone && errors.phone.message}
          style={{ fontWeight: "500", color: "gray" }}
        />
      </div>
    </ProviderSettingSection>
  );
  const spendArray = [2000, 10999, 11000, 20999, 21000, 30999, 40000];

  const SpendSection = (
    <ProviderSettingSection
      title="How much do you spend each month on online marketing"
      subTitle="These information are confidential and will help our team to customize your experience. "
    >
      <div className="flex flex-col gap-4">
        {spendArray.map((minSpend, index) => {
          if (index % 2 === 0) {
            const text =
              `${currency_symbol}${minSpend} ` +
              (index == spendArray.length - 1
                ? `and above`
                : `- ${currency_symbol}${spendArray[index + 1]}`);
            return (
              <RadioBoxButton
                text={text}
                shadow={false}
                checked={text == getValues().spend_each_month}
                onChange={() => {
                  setValue("spend_each_month", text);
                }}
                className="py-4 bg-primary-light border-none rounded-3xl"
              />
            );
          }
        })}
        <CommonInput
          {...register("spend_each_month", {
            required: true,
          })}
          type="hidden"
          error={errors.spend_each_month && "Select one of the values."}
        />
      </div>
    </ProviderSettingSection>
  );
  const roleNames: Record<RoleType, string> = {
    Business: "Company",
    Individual: "Individual",
  };
  const RoleSection = (
    <ProviderSettingSection
      title="Choose your role"
      subTitle="Let’s help you find customers."
    >
      <div className="flex flex-col gap-4">
        {["Individual", "Business"].map((role: RoleType, index) => {
          return (
            <RadioBoxButton
              text={roleNames[role]}
              shadow={false}
              checked={role == getValues().type}
              onChange={() => {
                setValue("type", role);
              }}
              className="py-4 bg-primary-light border-none rounded-3xl"
            />
          );
        })}
        <CommonInput
          {...register("type", {
            required: true,
          })}
          type="hidden"
          error={errors.type && "Select one of the values."}
        />
      </div>
    </ProviderSettingSection>
  );
  //
  const servicesNames: Record<ServicesType, string> = {
    Quotationbased: "Quotation based",
    Hourlybased: "Hourly based",
  };
  const ServicesSection = (
    <ProviderSettingSection
      title="Your service"
      subTitle="Let’s help you find customers."
    >
      <div className="flex flex-col gap-4">
        {["Quotationbased", "Hourlybased"].map((role: ServicesType, index) => {
          return (
            (getValues().type === "Business" && role === "Quotationbased" && (
              <RadioBoxButton
                text={servicesNames[role]}
                shadow={false}
                checked={role == getValues().typeS}
                onChange={() => {
                  setValue("typeS", role);
                }}
                className="py-4 bg-primary-light border-none rounded-3xl"
              />
            )) ||
            (getValues().type === "Individual" && role === "Hourlybased" && (
              <RadioBoxButton
                text={servicesNames[role]}
                shadow={false}
                checked={role == getValues().typeS}
                onChange={() => {
                  setValue("typeS", role);
                }}
                className="py-4 bg-primary-light border-none rounded-3xl"
              />
            ))
          );
        })}
        <CommonInput
          {...register("typeS", {
            required: true,
          })}
          type="hidden"
          error={errors.typeS && "Select the value."}
        />
      </div>
    </ProviderSettingSection>
  );
  //end

  const [activeService, setActiveService] = useState<IMenu>();
  const selectedServices =
    getValues().services ||
    headerMenu.map((m) => ({
      serviceId: m.id,
      subServiceIds: [],
    }));
  let { subServiceIds = [] } =
    (activeService &&
      selectedServices.find((s) => s.serviceId == activeService.id)) ||
    {};
  const checkboxChanged = (subService: ISubService, checked: boolean) => {
    if (checked && !subServiceIds.includes(subService.id))
      subServiceIds.push(subService.id);
    if (!checked) {
      let index = subServiceIds.findIndex((id) => id == subService.id);
      if (index >= 0) subServiceIds.splice(index, 1);
    }
    setValue("services", [...selectedServices]);
  };
  const ServiceSection = (
    <ProviderSettingSection
      title="Choose service category"
      subTitle="What is your line of work?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {headerMenu.map((service) => {
          const count = selectedServices.find((s) => s.serviceId == service.id)
            ?.subServiceIds.length;
          return (
            <button
              className={clsx([
                "fare-btn",
                activeService?.id == service.id
                  ? "fare-btn-primary"
                  : "fare-btn-default text-gray-700",
              ])}
              onClick={() => setActiveService(service)}
            >
              {service.name}
              {count > 0 && (
                <span className="badge badge-primary badge-pill mx-2">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {activeService?.sub_services.map((subService) => (
          <CheckBoxButton
            text={subService.name}
            shadow={false}
            onChange={(checked) => {
              checkboxChanged(subService, checked);
            }}
            checked={subServiceIds.includes(subService.id)}
          />
        ))}
      </div>
      <p className="text-danger">
        {!selectedServices.some((s) => s.subServiceIds.length > 0) &&
          "Select one of the services."}
      </p>
    </ProviderSettingSection>
  );

  const getAddrDetail = (address: any) => {
    const {
      address_components,
      value: place_id,
      label: formatted_address,
      zipCode,
    } = address;
    const postalCode = address_components?.find((address) => {
      return address?.types?.includes("postal_code")
        ? address?.long_name
        : null;
    });

    const city = address_components?.find((address) => {
      return address?.types?.includes("locality") ? address?.long_name : null;
    });

    const state = address_components?.find((address) => {
      return address?.types?.includes("administrative_area_level_1")
        ? address?.long_name
        : null;
    });

    const country = address_components?.find((address) => {
      return address?.types?.includes("country") ? address?.long_name : null;
    });

    return {
      zipCode: postalCode?.long_name ?? state?.long_name,
      city: city?.long_name,
      state: state?.long_name,
      country: country?.long_name,
      place_id,
      formatted_address,
    };
  };
  const zipCode = getValues().zip_code || [];
  const ZipCodeSection = (
    <ProviderSettingSection title="Where do you work?" subTitle="">
      <div>
        <label>Location</label>
        <LocationInput
          {...register("zip_code", {
            required: { value: true, message: "Location is required." },
          })}
          placeholder="Enter your location"
          onChange={(value) => {
            setValue("zip_code", [...zipCode, getAddrDetail(value)]);
            refresh();
          }}
        />
        <div className="zip-code d-flex flex-wrap mt-4">
          {zipCode?.map((zip, index) => (
            <div
              key={index}
              className="badge-ctm d-flex align-items-center justify-content-between mr-2 mb-1"
            >
              {zip?.formatted_address}{" "}
              <span
                className="la la-times ml-1"
                onClick={() => {
                  setValue(
                    "zip_code",
                    zipCode.filter(
                      (thisZip) => thisZip?.place_id !== zip?.place_id
                    )
                  );
                  refresh();
                }}
              ></span>
            </div>
          ))}
        </div>
        <p className="text-danger mt-2">
          {!zipCode.length && "Location is required."}
        </p>
      </div>
    </ProviderSettingSection>
  );
  const slides = [
    NameSection,
    SpendSection,
    RoleSection,
    ServicesSection,
    ServiceSection,
    ZipCodeSection,
  ];
  const slideValidateKeys: (keyof IProviderSettings)[][] = [
    ["first_name", "last_name", "phone"],
    ["spend_each_month"],
    ["type"],
    ["typeS"],
    ["services"],
    ["zip_code"],
  ];

  const onNext = async () => {
    if (await trigger(slideValidateKeys[step])) {
      if (slideValidateKeys[step][0] == "services") {
        if (selectedServices.some((s) => s.subServiceIds.length > 0)) {
          setStep((step) => Math.min(slides.length - 1, step + 1));
          if (step == slides.length - 1) {
            props.onComplete(getValues());
          }
        } else {
          setStep((step) => Math.min(slides.length - 1, step));
        }
      } else {
        setStep((step) => Math.min(slides.length - 1, step + 1));
        if (step == slides.length - 1) {
          props.onComplete(getValues());
        }
      }
    }
  };
  const onPrev = async () => {
    setStep((step) => Math.max(0, step - 1));
    setValue(slideValidateKeys[step][0], "");
  };
  const handleForm = (value) => {};
  return (
    <div className="px-8 flex flex-col gap-4 relative">
      <div
        className="text-xs px-4 py-2 bg-gray-100 text-primary rounded-pill absolute -top-[1rem] -right-[1rem] "
        style={{ fontWeight: "600" }}
      >
        Step {step + 1} of {slides.length}
      </div>
      <div>
        <span className="text-base text-primary-main">
          Set up your business profile
        </span>
      </div>
      <form onSubmit={handleSubmit(handleForm)} key={step}>
        {slides.at(step)}
      </form>
      <button
        type="button"
        className="fare-btn fare-btn-lg fare-btn-primary"
        onClick={onNext}
      >
        Next
      </button>
      <button
        className="fare-btn fare-btn-lg fare-btn-default"
        onClick={onPrev}
      >
        Previous
      </button>
    </div>
  );
}

