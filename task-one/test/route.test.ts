import request from "supertest";
import app from "../app";

import { deleteFile } from "./helper";

beforeEach(async () => {
  deleteFile();
});

let sampleData = {
  organization: "node ninja",
  createdAt: "2020-08-12T19:04:55.455Z",
  updatedAt: "2020-08-12T19:04:55.455Z",
  products: ["developers", "pizza"],
  marketValue: "90%",
  address: "sangotedo",
  ceo: "cn",
  country: "Taiwan",
  id: 1,
  noOfEmployees: 2,
  employees: ["james bond", "jackie chan"],
};

let sampleData2 = {
  organization: "node ninja",
  products: ["developers", "pizza"],
  marketValue: "90%",
  address: "sangotedo",
  ceo: "cn",
  country: "Taiwan",
  id: 1,
  noOfEmployees: 2,
  employees: ["james bond", "jackie chan"],
};

describe("GET API TESTS", () => {
  test("gets no data if database.json file does not exist", async () => {
    const res = await request(app).get("/api/datas");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      status: "succes",
      data: {
        dB: [],
      },
    });
  });
  test("test if after posting, you can get all", async () => {
    await request(app).post("/api/datas").send(sampleData);
    const res = await request(app).get("/api/datas");
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      status: "succes",
      data: {
        dB: [sampleData2],
      },
    });
  });

  test("GET /api/datas/:id", async () => {
    const req = await request(app).post("/api/datas").send(sampleData);
    const res = await request(app).get("/api/datas/" + req.body.id);
    expect(req.statusCode).toBe(201);
    expect(res.body.id).toBe(req.body.id);
  });
});

describe("POST API TESTS", () => {
  test("test for posting", async () => {
    // const sampleTodo = { title: "test", content: "my very first todo" };

    const res = await request(app).post("/api/datas").send(sampleData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      status: "success",
      data: {
        new: sampleData2,
      },
    });
  });
});
let id = 1;
describe("Test for delete", () => {
  test("DELETE /api/datas/:id", async () => {
    const res = await request(app).post("/api/datas").send(sampleData);
    await request(app).get(`/api/datas/${id}`);
    const deleted = await request(app).delete(`/api/datas/${id}`);
    expect(deleted.statusCode).toBe(201);
    expect(deleted.body).toEqual({
      status: "success",
      msg: "succesfully removed",
    });
  });
});

describe("Test for Put", () => {
  test("PUT /api/datas/:id", async () => {
    const res = await request(app).post("/api/datas").send(sampleData);
    await request(app).get(`/api/datas/${id}`);
    const updated = await request(app).put(`/api/datas/${id}`);
    expect(updated.statusCode).toBe(201);
    expect(updated.body).toMatchObject({
      status: "success",
      data: {
        updated: sampleData2,
      },
    });
  });
});
