const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const RecruiterRepo = requireRepo("recruiters");

describe("Test Handler Applicants/UserCanViewApplicants", () => {
  it("can_view_all_recruiters", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };
      const testQuery = await RecruiterRepo.create({
        "name":"hr 1",
        "user_uuid": contextClassRef.user.user_uuid,
        "recruiter_type":"in-house",
        "recruiter_description":{
          "type":"company"
        },
        "currently_hiring":true
      });
      result = await testStrategy("Recruiters/CanViewAllRecruiters", {
        prepareResult: {
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toEqual(
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
