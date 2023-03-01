import React, { useEffect, useState } from "react";
import { CalendarScreen } from "../components/CalendarScreen";
import { CalendarSettingsForm } from "../components/CalendarSettingsForm";
import { HardCodedData } from "../utils/who-data";
import { GetStaticProps, InferGetStaticPropsType } from "next";

interface Props {
  allowedCountries: { code: string; name: string }[];
}

const CalendarPage: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ allowedCountries }: InferGetStaticPropsType<typeof getStaticProps>) => {
  /* export const CalendarPage: React.FC<Props> = ({ allowedCountries }: InferGetStaticPropsType<typeof getStaticProps>) => { */
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

  return (
    <div>
      <div className="text-center text-4xl">Calendar Page</div>
      <CalendarScreen
        birthdate={birthdate}
        country={countryCode}
        gender={gender}
      />
      <div className="flex flex-row place-content-center p-6 ">
        <CalendarSettingsForm
          country={countryCode}
          changeCountry={changeCountry}
          gender={gender}
          changeGender={changeGender}
          birthdate={birthdate}
          changeBirthdate={changeBirthdate}
          countryOptions={allowedCountries}
        />
      </div>
    </div>
  );
};

export default CalendarPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  let allowedCountries = HardCodedData.countryOptions;

  return {
    props: {
      lala: "hello",
      allowedCountries: allowedCountries,
    },
  };
};
