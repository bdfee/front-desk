import { sequelize } from "../../utils/connectToDb";
import supertest from "supertest";
import app from "../../app";
import { dropAllTables } from "../helpers/models";

const api = supertest(app);

beforeEach(async () => await dropAllTables());

test("patients are returned as json", async () => {
  await api
    .get("/api/patients")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(async () => await sequelize.close());
