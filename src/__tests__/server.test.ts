import request from "supertest";
import server from "../server";

describe("GET api", () => {
  test("Should send back a json response", async () => {
    const res = await request(server).get("/api");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.msg).toBe("Desde API");

    expect(res.status).not.toBe(404);
    expect(res.headers["content-type"]).not.toMatch(/html/);
    expect(res.body.msg).not.toBe("desde api");
  });
});
