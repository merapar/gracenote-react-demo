import { getTheatreRequest } from "../theatres";

test("fetches one theater object by theater id", async () => {
  const response = await getTheatreRequest({
    theatreId: 8749,
  });
  expect(response?.status).toBe(200);
  const payload = await response?.json();
  expect(Object.keys(payload).length).toBeGreaterThan(0);
});
