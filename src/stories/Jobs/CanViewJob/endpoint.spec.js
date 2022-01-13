const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const JobsRepo = requireRepo("jobs");

describe("Test API Jobs/CanViewJob", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("can_view_a_job", async () => {
    let respondResult;
    try {
      const app = httpServer();

      const testJob = await JobsRepo.create({
        recruiter_uuid: "001",
        title: "Full stack Developer",
        job_description: {
          comapny: "google",
        },
        status: "active"
      });

      respondResult = await app.inject({
        method: "GET",
        url: `/jobs/${testJob.uuid}`,
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      uuid: expect.any(String),
      recruiter_uuid: "001",
      title: "Full stack Developer",
      job_description: {
        comapny: "google",
      },
      status: "active"
    });
  });
});
