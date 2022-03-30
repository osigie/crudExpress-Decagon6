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

  // test("GET /api/posts", async () => {
  //  await request(app).post("/api/posts").send(sampleData)
  // const res = await request(app).get("/api/posts")
  //     expect(res.statusCode).toBe(200)
  //     expect((res) => {
  //       // Check type and length
  //       expect(Array.isArray(response.body)).toBeTruthy();
  //       expect(response.body.length).toEqual(1);

  //       // Check data
  //       expect(response.body[0]._id).toBe(post.id);
  //       expect(response.body[0].title).toBe(post.title);
  //       expect(response.body[0].content).toBe(post.content);
  //     });
  // });

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

// });
// describe("Delete /datas", function () {
//   test("Respond with right status code", async () => {
//     await request(app).delete("/api/datas/1").expect(201);
//   });
// });
// describe("GET /datas", function () {
//   test("Respond with right status code for all data", async () => {
//     await request(app).get("/api/datas").expect(200);
//   });
//   test("Respond with right status code for single data", async () => {
//     await request(app).get("/api/datas/1").expect(200);
//   });
// });

// .send({
//   organization: "node ninja",
//   createdAt: "2022-03-30T00:31:03.849Z",
//   updatedAt: "2022-03-30T00:32:28.856Z",
//   products: ["developers", "pizza"],
//   marketValue: "90%",
//   address: "sangotedo",
//   ceo: "cn",
//   country: "Taiwan",
//   id: 1,
//   noOfEmployees: 2,
//   employees: ["james bond"],
// })

// describe("POST /users",  function () {
//   it("responds with json", function (done) {
//     request(app)
//       .post("/api/datas")
//       .send({
//         organization: "node ninja",
//         createdAt: "2022-03-30T00:31:03.849Z",
//         updatedAt: "2022-03-30T00:32:28.856Z",
//         products: ["developers", "pizza"],
//         marketValue: "90%",
//         address: "sangotedo",
//         ceo: "cn",
//         country: "Taiwan",
//         id: 1,
//         noOfEmployees: 2,
//         employees: ["james bond"],
//       })
//       .expect(201);
//   });
// });

// describe("GET /user", function () {
//   it("responds with json", function (done) {
//     request(app)
//       .get("/api/datas")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200, done);
//   });
//   it("responds with json for single data", function (done) {
//     request(app)
//       .get("/api/datas/3")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200, done);
//   });
// });
