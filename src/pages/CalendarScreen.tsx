import React, { useEffect, useId, useState } from "react";

interface Props {
  birthdate: Date;
  country: string;
  gender: "MLE" | "FMLE";
}

export const CalendarScreen: React.FC<Props> = ({
  birthdate,
  country,
  gender,
}) => {
  const [lifeExpectancyAtBirth, setLifeExpectancyAtBirth] = useState(70);

  let millisOld = new Date().getTime() - birthdate.getTime();
  let hoursOld = millisOld / 1000 / 60 / 60;
  let weeksOld = hoursOld / 24 / 7 - 1;

  let weeksToLive = Math.ceil((lifeExpectancyAtBirth * 365) / 7);

  const screenId = useId();

  useEffect(() => {
    fetch(`/api/life-expectancy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ countryCode: country, gender: gender }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLifeExpectancyAtBirth(data.lifeExpectancyAtBirth)
      });
  }, [country, gender]);

  return (
    <div className=" flex justify-center p-2">
      <div className="flex w-11/12 flex-row flex-wrap lg:w-4/5  ">
        {new Array(weeksToLive).fill(0).map((skip, index) => {
          const passed = index < weeksOld;
          const date = new Date(
            birthdate.getTime() + index * (7 * 24 * 60 * 60 * 1000)
          );
          const yearsOld =
            (date.getTime() - birthdate.getTime()) / 1000 / 60 / 60 / 24 / 365;
          const cell = (
            <div
              title={`Date is ${date.toLocaleDateString()}\nYou ${
                passed ? "were" : "might be"
              } ${Math.floor(yearsOld)} years old.`}
              className={`border lg:border-2 border-slate-300 p-1 lg:m-px ${
                passed ? "rounded bg-amber-200" : ""
              } hover:border-blue-500`}
              key={`${screenId}-${index}`}
            ></div>
          );

          return cell;
        })}
      </div>
    </div>
  );
};
