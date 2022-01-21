const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test API CanPostJobWithRecruiter", () => {
  beforeAll(async () => {
    await truncateAllTables();
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("can_post_job_with_recruiter", async () => {
    let respondResult;
    try {
      const app = httpServer();

      const payload = {
        "title": "marketing intern",
        "job_description": {
          "company_name": "google",
          "location": {
            "country": "USA",
            "city": "New York"
          },
          "job_types": [
            "full time",
            "remote"
          ],
          "salary_offer_band": {
            "currency": "USD",
            "range": "100000$-200000$"
          },
          "company_size": 20000,
          "industry": [
            "IT",
            "WEB"
          ],
          "contact_details": {
            "email": "google@gamail.com"
          },
          "start_date": "12-10-2022"
        },
        "status": "draft",
        "recruiter_name": "rohan recruiter 2",
        "recruiter_description": {
          "location": {
            "country": "USA",
            "city": "New York"
          }
        }
      };

      respondResult = await app.inject({
        method: "POST",
        url: "/jobs-with-recruiter", // This should be in endpoints.js
        payload,
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      recruiter: expect.any(Object),
      job: expect.any(Object),
    });
  });
});
