import type { NextApiRequest, NextApiResponse } from "next";
import { HardCodedData } from "../../utils/who-data";

type Data = {
  lifeExpectancyAtBirth: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { body } = req;
  let countryLongevity = HardCodedData.lifeExpectancyAtBirth.filter(
    ({ SpatialDim, Dim1 }) =>
      SpatialDim == body.countryCode && Dim1 == body.gender
  ).sort(function (first, second) {
    return first.TimeDim < second.TimeDim ? -1 : 1
  })
  let mostCurrent = countryLongevity.at(0)
  res.status(200).json({ lifeExpectancyAtBirth: (mostCurrent?.NumericValue || 1) })
  // handle the request and response
}
