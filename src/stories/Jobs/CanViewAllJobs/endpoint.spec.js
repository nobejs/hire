const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const JobsRepo = requireRepo("jobs");

describe("Test API Jobs/ViewAllJobs", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`,
    };
  });

  it("can_view_all_jobs", async () => {
    let respondResult;
    try {
      const app = httpServer();

      await JobsRepo.create({
        recruiter_uuid: "001",
        title: "Full stack Developer",
        job_description: {
          comapny: "google",
        },
        status: "active"
      });

      respondResult = await app.inject({
        method: "GET",
        url: "/jobs",
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uuid: expect.any(String),
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
