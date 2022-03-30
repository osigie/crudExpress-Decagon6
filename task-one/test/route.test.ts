import request from "supertest";
import app from "../app";

import {deleteFile} from"./helper"

beforeEach(async () => {
  deleteFile()
})

afterAll((done) => {
  done();
});


describe('GET API TESTS', () => {
  test('gets no todo if database.json file does not exist', async () => {
    const res = await request(app).get("/api/datas")

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      status: "succes",
      data: {
        dB: [],
      },
    })
  })

  test('gets todos if there are todos in database.json file', async () => {
    const sampleTodo = { title: 'test', content: 'my very first todo' }

    await request(app).post("/api/datas").send(sampleTodo)
    const res = await request(app).get("/api/datas")

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      status: "succes",
      data: {
        dB: [sampleTodo],
      },
    })
  })
})


// describe("PUT /datas", function () {
//   test("Respond with right status code", async () => {
//     await request(app).put("/api/datas/1").expect(201);
//   });
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
