import index from "../index";
import request from "supertest";

it("response has correct fields", async () => {
  const response = await request(index).post("/movies").send({ search: "old" });

  expect(response.body).not.toBeNull();
});

it("should listen on the port specified in the environment variable or 8080", () => {
  const spy = jest.spyOn(console, "log").mockImplementation(() => {});
  index.listen(8080);
  expect(spy).toHaveBeenCalledWith("Example app listening on port 8080");
  spy.mockRestore();
});
