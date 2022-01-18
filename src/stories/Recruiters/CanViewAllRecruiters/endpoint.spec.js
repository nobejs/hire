const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const RecruiterRepo = requireRepo("recruiters");

describe("Test API CanViewAllRecruiters", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("can_view_all_recruiters", async () => {
    let respondResult;
    try {
      const app = httpServer();

      await RecruiterRepo.create({
        "name":"hr 1",
        "user_uuid": contextClassRef.user.user_uuid,
        "recruiter_type":"in-house",
        "recruiter_description":{
          "type":"company"
        },
        "currently_hiring":true
      });

      respondResult = await app.inject({
        method: "GET",
        url: "/recruiters",
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "name":"hr 1",
          "user_uuid": contextClassRef.user.user_uuid,
          "recruiter_type":"in-house",
          "recruiter_description":{
            "type":"company"
          },
          "currently_hiring":true
        }),
      ])
    );
  });
});
