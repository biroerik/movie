import request from "supertest";
import index from "../index";
it("response has correct fields", async () => {
  const response = await request(index).post("/movies").send({ search: "old" });

  expect(response.body).toHaveProperty("results");
});
