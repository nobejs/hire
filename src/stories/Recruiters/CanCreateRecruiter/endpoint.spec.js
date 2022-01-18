const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();

describe("Test API Applicants/CanCreateRecruiter", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`,
    };
  });

  it("can_create_recruiters", async () => {
    let respondResult;
    try {
      const app = httpServer();

      const payload = {
        name:"hr 1110",
        recruiter_type:"in-house",
        recruiter_description:{
            type:"company"
        },
        currently_hiring:true
    }
      respondResult = await app.inject({
        method: "POST",
        url: "/recruiters",
        payload,
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      uuid: expect.any(String),
      user_uuid: contextClassRef.user.user_uuid,
      recruiter_type:"in-house",
      recruiter_description:{
          type:"company"
      },
      currently_hiring:true
    });
  });
});
