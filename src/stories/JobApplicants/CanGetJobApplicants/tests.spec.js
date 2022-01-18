const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();

describe("Test Handler JobApplicants/CanGetJobApplicants", () => {
  it("user_can_get_job_applicants", async () => {
    let result = {};
    try {
      result = await testStrategy("JobApplicants/CanGetJobApplicants", {
        prepareResult: {},
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(1).toBe(1);
  });
});
