const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const JobsRepo = requireRepo("jobs");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test API Jobs/CanUpdateJob", () => {
  beforeAll(async () => {
    await truncateAllTables();
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("can_update_a_job", async () => {
    let respondResult;
    try {
      const app = httpServer();
      const testJob = await JobsRepo.create({
        recruiter_uuid: "001",
        title: "Full stack Developer",
        job_description: {
          company: "google",
        },
        status: "active"
      });

      const payload = {
        recruiter_uuid: "001",
        title: "React JS",
        job_description: {
          company: "Facebook",
          experience: "3yrs"
        },
        status: "draft"
      };

      respondResult = await app.inject({
        method: "PUT",
        url: `/jobs/${testJob.uuid}`,
        payload,
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
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
