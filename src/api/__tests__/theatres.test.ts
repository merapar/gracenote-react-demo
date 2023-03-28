import { theatresByPostalCodeRequest } from "../theatres";

test("fetches theaters near 78701 postal code area", async () => {
  const response = await theatresByPostalCodeRequest({
    zipCode: "78701",
    startDate: "2023-03-27",
  });
  expect(response?.status).toBe(200);
  const payload = await response?.json();
  console.log(payload.length);
  console.log(payload);
  expect(payload.length).toBeGreaterThan(0);
});
