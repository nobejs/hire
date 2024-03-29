const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const randomUser = requireUtil("randomUser");
const contextClassRef = requireUtil("contextHelper");
const JobsRepo = requireRepo("jobs");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test Handler Jobs/UserCanUpdateJob", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });
  it("can_update_a_job", async () => {
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
      result = await testStrategy("Jobs/CanUpdateJob", {
        prepareResult: {
          reqParams: {
            uuid: testJob.uuid,
          },
          reqBody: {
            recruiter_uuid: "001",
            title: "React JS",
            job_description: {
              company: "Facebook",
              experience:"3yrs"
            },
            status: "draft"
          },
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      recruiter_uuid: "001",
      title: "React JS",
      job_description: {
        company: "Facebook",
        experience:"3yrs"
      },
      status: "draft"
    });
  });
});
