const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const RecruiterRepo = requireRepo("recruiters");

describe("Test API Applicants/CanViewRecruiter", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("can_view_recruiter", async () => {
    let respondResult;
    try {
      const app = httpServer();

      const testQuery = await RecruiterRepo.create({
        "name": "hr 1",
        "user_uuid": contextClassRef.user.user_uuid,
        "recruiter_type": "in-house",
        "recruiter_description": {
          "type": "company"
        },
        "currently_hiring": true
      });
      respondResult = await app.inject({
        method: "GET",
        url: `/recruiters/${testQuery.uuid}`,
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      uuid: expect.any(String),
      "name": "hr 1",
      "user_uuid": contextClassRef.user.user_uuid,
      "recruiter_type": "in-house",
      "recruiter_description": {
        "type": "company"
      },
      "currently_hiring": true
    });
  });
});
