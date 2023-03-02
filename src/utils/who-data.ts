import allWHOData from "./WHOSIS_000001.json";
import countryDimention from "./DimensionCountryValues.json";

interface WHODataItem {
  SpatialDim: string;
  Dim1: string;
  TimeDim: number;
  NumericValue: number;
}

const longevityData: WHODataItem[] = allWHOData.value satisfies WHODataItem[];
const knownCountries = new Set(longevityData.map((item) => item.SpatialDim));

const filteredCountryOptions: {
  code: string;
  name: string;
}[] = countryDimention.value
    .filter((item) => knownCountries.has(item.Code))
    .map(({ Code, Title }) => ({
      code: Code,
      name: Title,
    })).sort(function (first, second) {
      return first.name < second.name ? -1 : 1
    });

export namespace HardCodedData {
  export const lifeExpectancyAtBirth = longevityData;
  export const countryOptions = filteredCountryOptions;
}
