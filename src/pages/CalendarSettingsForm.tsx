import React from "react";

interface Props {
  country: string;
  changeCountry: (country: string) => void;
  gender: "MLE" | "FMLE";
  changeGender: (gender: "MLE" | "FMLE") => void;
  birthdate: Date;
  changeBirthdate: (age: Date) => void;
  countryOptions: { code: string; name: string }[];
}

export const CalendarSettingsForm: React.FC<Props> = ({
  country,
  changeCountry,
  gender,
  changeGender,
  birthdate,
  changeBirthdate,
  countryOptions,
}) => {
  const formId = React.useId();

  // lerning tailwind here https://v1.tailwindcss.com/components/forms
  return (
    <form className="w-full max-w-sm">
      <div className=" mb-4 md:flex md:items-center ">
        <div className="md:w-1/3">
          <label
            htmlFor={`${formId}--birthdate`}
            className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
          >
            Age:
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            type="date"
            id={`${formId}-birthdate`}
            value={birthdate.toISOString().split("T")[0]}
            onChange={(event) => {
              let dateStr = event.target.value;
              if (dateStr != "") {
                let dateObj = new Date(dateStr);
                console.log(`setting birthdate ${dateStr} ; ${dateObj}`);
                changeBirthdate(dateObj);
              }
            }}
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-1 px-4 leading-tight
            text-gray-700 focus:border-amber-500 focus:bg-white focus:outline-none"
          />
        </div>
      </div>
      <div className="mb-4 md:flex md:items-center ">
        <div className="md:w-1/3">
          <label
            htmlFor={`${formId}-gender`}
            className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
          >
            Gender:
          </label>
        </div>
        <div className="md:w-2/3">
          <select
            id={`${formId}-gender`}
            value={gender}
            onChange={(event) => {
              let input = event.target.value;
              let val: "MLE" | "FMLE" =
                input == "MLE" || input == "FMLE" ? input : "MLE";
              changeGender(val);
            }}
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-1 px-4 leading-tight
            text-gray-700 focus:border-amber-500 focus:bg-white focus:outline-none"
          >
            <option value="MLE">Male</option>
            <option value="FMLE">Female</option>
          </select>
        </div>
      </div>
      <div className="mb-4 md:flex md:items-center ">
        <div className="md:w-1/3">
          <label
            htmlFor={`${formId}-country`}
            className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
          >
            Country:
          </label>
        </div>
        <div className="md:w-2/3">
          <select
            id={`${formId}-country`}
            value={country}
            onChange={(event) => changeCountry(event.target.value)}
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-1 px-4 leading-tight
            text-gray-700 focus:border-amber-500 focus:bg-white focus:outline-none"
          >
            {countryOptions.map(({ code, name }) => (
              <option key={`${formId}-country-${code}`} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr />
    </form>
  );
};
