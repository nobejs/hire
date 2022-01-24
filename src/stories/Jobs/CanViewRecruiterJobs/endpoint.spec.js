const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const JobsRepo = requireRepo("jobs");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test API CanViewRecruiterJobs", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("CanViewRecruiterJobs", async () => {
    let respondResult;
    try {
      const app = httpServer();
      await JobsRepo.create({
        recruiter_uuid: "001",
        title: "Full stack Developer",
        job_description: {
          company: "google",
        },
        status: "active"
      });

      const payload = {};

      respondResult = await app.inject({
        method: "GET",
        url: "/jobs/recruiter", // This should be in endpoints.js
        headers:contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      "message": "recruiter not found"
    });
  });
});
