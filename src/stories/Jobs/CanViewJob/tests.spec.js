const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const JobsRepo = requireRepo("jobs");
const randomUser = requireUtil("randomUser");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test Handler Jobs/UserCanViewJob", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });
  it("can_view_a_job", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };

      const testJob = await JobsRepo.create({
        recruiter_uuid: "001",
        title: "Full stack Developer",
        job_description: {
          company: "google",
        },
        status: "active"
      });
      result = await testStrategy("Jobs/CanViewJob", {
        prepareResult: {
          uuid: testJob.uuid,
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      recruiter_uuid: "001",
      title: "Full stack Developer",
      job_description: {
        company: "google",
      },
      status: "active"
    });
  });
});
