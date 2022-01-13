const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const JobsRepo = requireRepo("jobs");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test API CanCloseJob", () => {
  beforeAll(async () => {
    await truncateAllTables();
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("can_close_job", async () => {
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

      respondResult = await app.inject({
        method: "DELETE",
        url: `/jobs/${testJob.uuid}`, // This should be in endpoints.js
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      message: "success"
    });
  });
});
