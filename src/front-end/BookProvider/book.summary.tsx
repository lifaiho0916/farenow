import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import { getQuestionAnswers } from "../../store/Slices/services/QuestionAnswersSlice";
import { ServiceState } from "../../store/Slices/services/ServiceSclice";
export interface IBookSummaryProps
  extends IBookSliderProps<Partial<IServiceRequestHourly>>,
    IServiceRequestHourly {
  provider: IProvider;
  transaction_id: any;
}
interface ExtendedRootState extends RootState {
  countryReducer: {
    selectcountry: string;
  };
}

export default function BookSummary(props: IBookSummaryProps) {
  const {
    onPrev,
    onNext,
    prevLabel = "Previous",
    nextLabel = "Next",
    hours,
    address,
    provider,
    payMethod,
    plan_id,
  } = props;
  const service = useSelector<RootState, ServiceState>(
    (state) => state.service
  );
  const questions = useSelector<RootState, IServiceQuestion[]>(
    (state) => state.service.data.questions
  );
  const questionAnswers = useSelector<RootState>((state) =>
    getQuestionAnswers(state.questionAnswers)
  );
  const plan = provider.plans?.find((p) => p.id === plan_id);
  const amount =
    (Number(provider.provider_profile?.hourly_rate) *
      hours *
      (100 - (plan?.off ?? 0))) /
    100;

  const userData = JSON.parse(localStorage.getItem("user_data"));

  const allCountry = useSelector((state: any) => state?.allCountryReducer);

  const [currency, setCurrency] = useState("NGN");
  const [currency_symbol, setCurrencySymbol] = useState("₦");

  useEffect(() => {
    for (let index = 0; index < allCountry.countries.length; index++) {
      const element = allCountry.countries[index];
      if (element.id == localStorage.getItem("country")) {
        setCurrency(element?.currency);
        setCurrencySymbol(element?.currency_symbol);
      }
    }
  }, [allCountry]);

  const handleFlutterPayment = useFlutterwave({
    public_key: process.env.REACT_APP_FLUTTERWAVE_KEY,
    tx_ref: Date.now().toString(),
    amount: amount,
    currency: currency,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userData.email,
      phone_number: userData.phone,
      name: userData.first_name + " " + userData.last_name,
    },
    customizations: {
      title: "Farenow",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  });
  const handlePayment = () => {
    handleFlutterPayment({
      callback: async (response) => {
        const verify = {
          transaction_id: response.transaction_id,
          amount: response.amount,
          currency: response.currency,
        };
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/flutterwave/payment/verify`,
          verify,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `${localStorage.userToken}`,
            },
          }
        );
        if (res.status === 200) {
          closePaymentModal();
          response.transaction_id &&
            onNext &&
            onNext({ transaction_id: response.transaction_id });
        } else {
          toast.error("Payment Failed");
        }
      },
      onClose: () => {
        toast.error("Payment Failed");
      },
    });
  };
  return (
    <div className="d-flex flex-column items-center gap-8 order-summary">
      <span className="font-medium text-3xl">Order Summary</span>
      <ul className="list-group w-[72rem] rounded-[1.2rem]">
        <li className="list-group-item d-flex justify-between">
          Service:<span className="font-bold">{service.data?.name}</span>
        </li>
        <li className="list-group-item d-flex justify-between">
          Provider:
          <span className="font-bold">
            {provider?.first_name}&ensp;{provider?.last_name}
          </span>
        </li>
        {questions?.map((q) => (
          <li className="list-group-item d-flex justify-between" key={q.id}>
            {q.question}:
            <span className="font-bold">
              {q.options.find(
                (op) => op.id === questionAnswers[`question_${q.id}`]
              )?.option || ""}
            </span>
          </li>
        ))}
        <li className="list-group-item d-flex justify-between">
          Work Hours:<span className="font-bold">{hours}</span>
        </li>
        <li className="list-group-item d-flex justify-between">
          Address:
          <span className="font-bold">{address}</span>
        </li>
        <li className="list-group-item d-flex justify-between bg-primary-dark text-white">
          Total ({currency})
          <span className="font-bold">
            {currency_symbol}&nbsp;{amount?.toFixed(2)}
          </span>
        </li>
      </ul>
      <div className="gap-8 d-flex">
        {onPrev && (
          <button
            className="fare-btn fare-btn-default fare-btn-lg"
            onClick={onPrev}
          >
            {prevLabel}
          </button>
        )}

        {payMethod == "Paypal" && (
          <PayPalButtons
            fundingSource="paypal"
            className="flex items-center w-[30rem]"
            style={{
              color: "blue",
              label: "pay",
              height: 50,
            }}
            createOrder={async (data, actions) => {
              return await actions.order.create({
                purchase_units: [
                  {
                    amount: { value: `${amount}` },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const order = await actions.order.capture();
              onNext && onNext({ order_paypal: order });
            }}
          />
        )}
        {payMethod === "Flutterwave" && (
          <button
            className="fare-btn fare-btn-primary fare-btn-lg"
            onClick={() => handlePayment()}
          >
            {nextLabel}
          </button>
        )}
        {payMethod == "Card" && (
          <button
            className="fare-btn fare-btn-primary fare-btn-lg"
            onClick={() => {
              onNext && onNext();
            }}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}
