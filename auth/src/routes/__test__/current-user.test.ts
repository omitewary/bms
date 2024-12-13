import request from "supertest";
import { app } from "../../app";

it("should send details of current user after sign up", async () => {
  const cookie = await global.signin();

  if (!cookie) {
    throw new Error("Cookie not set after signup");
  }

  const response2 = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response2.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(401);

  expect(response.body.errors).toBeDefined();
  expect(response.body.errors[0].message).toEqual("Not Authorized");
});
