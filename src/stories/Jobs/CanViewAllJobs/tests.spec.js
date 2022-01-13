const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const JobsRepo = requireRepo("jobs");

describe("Test Handler Jobs/UserCanViewAllJobs", () => {
  it("can_view_all_jobs", async () => {
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
          comapny: "google",
        },
        status: "active"
      });
      result = await testStrategy("Jobs/CanViewAllJobs");
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uuid: expect.any(String),
          recruiter_uuid: "001",
          title: "Full stack Developer",
          job_description: {
            comapny: "google",
          },
          status: "active"
        }),
      ])
    );
  });
});
