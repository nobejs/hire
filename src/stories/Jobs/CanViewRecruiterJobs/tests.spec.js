const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const JobsRepo = requireRepo("jobs");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test Handler CanViewRecruiterJobs", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });
  it("can_view_recruiter_jobs", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };
      await JobsRepo.create({
        recruiter_uuid: contextClassRef.user.user_uuid,
        title: "Full stack Developer",
        job_description: {
          company: "google",
        },
        status: "active"
      });
      result = await testStrategy("Jobs/CanViewRecruiterJobs", {
        prepareResult: {
          user: contextClassRef.user.user_uuid
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toEqual(
      expect.objectContaining({
        "message": "recruiter not found"
      }),
    );
  });
});
