import type { NextApiRequest, NextApiResponse } from "next";
import { HardCodedData } from "../../utils/who-data";
import lodash from "lodash";

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
  );
  let mostCurrent = lodash.maxBy(countryLongevity, (obj) => obj.TimeDim)!;
  res.status(200).json({ lifeExpectancyAtBirth: mostCurrent.NumericValue})
  // handle the request and response
}
