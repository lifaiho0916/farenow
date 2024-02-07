import React from "react";
import CommonInput from "../../../components/input.common";

const data = [
  {
    id: 1,
    country: "Nigeria",
    states: [
      { id: 1, state: "Abuja" },
      { id: 2, state: "Nigeria test" },
      { id: 3, state: "Nigeria test2" },
    ],
  },
  {
    id: 2,
    country: "Ghana",
    states: [
      { id: 1, state: "Ghana State" },
      { id: 2, state: "Ghana test" },
      { id: 3, state: "Ghana test2" },
    ],
  },
  {
    id: 3,
    country: "Kenya",
    states: [
      { id: 1, state: "Kenya state" },
      { id: 2, state: "Kenya test" },
      { id: 3, state: "Kenya test2" },
    ],
  },
];

const StateCommon = () => {
  return (
    <div className="w-[95%] md:w-[60%] mx-auto my-[32px]">
      <h1 className="text-lg font-semibold">Cities where we work - Farenow</h1>
      <div>
        <div className="flex justify-center gap-6 mt-[60px]">
          <div className="w-[50%]">
            <CommonInput className="p-4" placeholder="Search by zip code" />
          </div>
          <button className="fare-btn fare-btn-primary h-fit">
            Check Availability
          </button>
        </div>
        <div>
          {data.map((item) => {
            return (
              <div className="my-5">
                <span className="text-[#848A87] text-lg font-semibold">
                  {item.country}
                </span>
                {item.states.map((state) => {
                  return (
                    <span className="text-xs font-semibold cursor-pointer hover:text-primary my-2">
                      {state.state}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StateCommon;

