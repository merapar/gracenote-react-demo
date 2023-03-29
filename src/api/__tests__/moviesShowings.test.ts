import { moviesShowingsByPostalCodeRequest } from "../moviesShowings";
import { getTodayDateISO } from "../../utils/getTodaysDateISO";
jest.setTimeout(10_000);
test("fetches movies showings near 78701 postal code area", async () => {
  const response = await moviesShowingsByPostalCodeRequest({
    zipCode: "78701",
    startDate: getTodayDateISO(),
  });
  expect(response?.status).toBe(200);
  const payload = await response?.json();
  expect(payload.length).toBeGreaterThan(0);
});
