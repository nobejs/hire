const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const JobsRepo = requireRepo("jobs");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test API CanViewAppliedJobs", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("can view applied jobs", async () => {
    let respondResult;
    try {
      const app = httpServer();

      respondResult = await app.inject({
        method: "GET",
        url: "/jobs/seeker", // This should be in endpoints.js
        headers:contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toEqual(
      expect.objectContaining({
        "message": "Seeker doesn't exist"
      }),
    )
  });
});
