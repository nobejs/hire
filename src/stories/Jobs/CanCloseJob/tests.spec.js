const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const JobsRepo = requireRepo("jobs");
const randomUser = requireUtil("randomUser");

describe("Test Handler CanCloseJob", () => {
  it("can_close_job", async () => {
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
          comapny: "google",
        },
        status: "active"
      });

      result = await testStrategy("Jobs/CanCloseJob", {
        prepareResult: {
          uuid: testJob.uuid,
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      message: "success"
    });
  });
});
