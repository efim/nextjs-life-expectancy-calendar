import React, { useEffect, useState } from "react";
import { CalendarScreen } from "./CalendarScreen";
import { CalendarSettingsForm } from "./CalendarSettingsForm";
import { HardCodedData } from "./who-data";
import lodash from "lodash";

export const CalendarPage: React.FC = ({}) => {
  let savedCountry =
    typeof window !== "undefined" ? localStorage.getItem(`countryCode`) : "RUS";
  const [countryCode, setCountryCode] = useState(
    savedCountry ? savedCountry : "RUS"
  );
  function getDefaultGender(): "MLE" | "FMLE" {
    let saved =
      typeof window !== "undefined"
        ? localStorage.getItem(`countryCode`)
        : null;
    return saved == "MLE" || saved == "FMLE" ? saved : "MLE";
  }
  const [gender, setGender] = useState<"MLE" | "FMLE">(getDefaultGender());
  let savedDate =
    typeof window !== "undefined" ? localStorage.getItem(`birthdate`) : null;
  const [birthdate, setBirthdate] = useState(
    new Date(savedDate || "1992-01-01")
  );
  const [lifeExpectancyAtBirth, setLifeExpectancyAtBirth] = useState(70);

  function changeCountry(country: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(`countryCode`, country);
    }
    setCountryCode(country);
  }
  function changeGender(gender: "MLE" | "FMLE"): void {
    console.log(`saving GENDER to ${gender}`);
    if (typeof window !== "undefined") {
      localStorage.setItem(`gender`, gender);
    }
    setGender(gender);
  }
  function changeBirthdate(age: Date): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(`birthdate`, birthdate.toISOString().split("T")[0]);
    }
    setBirthdate(age);
  }

  useEffect(() => {
    let countryLongevity = HardCodedData.lifeExpectancyAtBirth.filter(
      ({ SpatialDim, Dim1 }) => SpatialDim == countryCode && Dim1 == gender
    );
    let mostCurrent = lodash.maxBy(countryLongevity, (obj) => obj.TimeDim)!;
    setLifeExpectancyAtBirth(mostCurrent.NumericValue);
  }, [countryCode, gender]);

  return (
    <div>
      <div className="text-center text-4xl">Calendar Page</div>
      <CalendarScreen
        birthdate={birthdate}
        lifeExpectancyAtBirth={lifeExpectancyAtBirth}
      />
      <div className="flex flex-row place-content-center p-6 ">
        <CalendarSettingsForm
          country={countryCode}
          changeCountry={changeCountry}
          gender={gender}
          changeGender={changeGender}
          birthdate={birthdate}
          changeBirthdate={changeBirthdate}
          countryOptions={HardCodedData.countryOptions}
        />
      </div>
    </div>
  );
};
