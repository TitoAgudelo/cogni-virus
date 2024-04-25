import React from "react";

interface CardType {
  name: string;
  average: string;
  days: string;
  value: string;
  variation: string;
}

const Card = ({ name, average, days, value, variation }: CardType) => {
  const isPositive = variation === "positive";

  return (
    <div className="bg-white rounded-[10px]">
      <div className="pt-4 px-3 pb-5">
        <p className="text-base text-indigo-950 font-semibold mb-4">{name}</p>
        <div className="flex flex-row items-center">
          <p className="text-3xl font-semibold text-indigo-950">{average}</p>
          {value && (
            <div
              className={
                isPositive
                  ? "bg-green-200 ml-3 py-[3px] pr-1.5 pl-2 rounded-full"
                  : "bg-rose-200 ml-3 py-[3px] pr-1.5 pl-2 rounded-full"
              }
            >
              <p
                className={
                  "text-xs" +
                  (isPositive ? " text-green-400" : " text-rose-500")
                }
              >
                {isPositive ? "+" : "-"}
                {value}%
              </p>
            </div>
          )}
        </div>
        <p className="text-xs text-indigo-950">{days}</p>
      </div>
      <div className="py-5 px-3 border-t border-gray-border cursor-pointer">
        <p className="text-xs tracking-tight text-indigo-950">
          Download Report
        </p>
      </div>
    </div>
  );
};

export default Card;
