const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const RecruiterRepo = requireRepo("recruiters");
const randomUser = requireUtil("randomUser");

describe("Test Handler Applicants/UserCanViewApplicant", () => {
  it("can_view_recruiter", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };

      const testQuery = await RecruiterRepo.create({
        "name": "hr 1",
        "user_uuid": contextClassRef.user.user_uuid,
        "recruiter_type": "in-house",
        "recruiter_description": {
          "type": "company"
        },
        "currently_hiring": true
      });
      result = await testStrategy("Recruiters/CanViewRecruiter", {
        prepareResult: {
          uuid: testQuery.uuid,
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
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
