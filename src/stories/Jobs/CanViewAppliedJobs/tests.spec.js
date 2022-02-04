const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const JobsRepo = requireRepo("jobs");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test Handler CanViewAppliedJobs", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });
  it("can_view_applied_jobs", async () => {
    let result = {};
    try {
      result = await testStrategy("Jobs/CanViewAppliedJobs", {
        prepareResult: contextClassRef.user.user_uuid,
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toEqual(
      expect.objectContaining({
        "message": "Seeker doesn't exist"
      }),
    )
  });
});
