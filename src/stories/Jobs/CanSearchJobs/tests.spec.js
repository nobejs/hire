const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const JobsRepo = requireRepo("jobs");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test Handler CanSearchJobs", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });
  it("can_search_jobs", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };
      await JobsRepo.create({
        recruiter_uuid: "001",
        title: "Full stack Developer",
        job_description: {
          company: "google",
          job_query: "Full stack Developer"
        },
        status: "active"
      });
      result = await testStrategy("Jobs/CanSearchJobs", {
        prepareResult: {
          "job_query": {
            "type": "like",
            "value": "stack",
            "error": "The above type is invalid"
          }
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      data: expect.any(Array),
    });
  });
});
