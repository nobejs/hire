const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test API Jobs/CanPostJob", () => {
  beforeAll(async () => {
    await truncateAllTables();
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`,
    };
  });

  it("can_post_job", async () => {
    let respondResult;
    try {
      const app = await httpServer();

      const payload = {
        recruiter_uuid: "001",
        title: "Full stack Developer",
        job_description: {
          company_name: "google",
          location: {
              country: "USA",
              city: "New York"
          },
          job_types: [
              "full time",
              "remote"
          ],
          salary_offer_band: {
              currency: "USD",
              range: "100000$-200000$"
          },
          company_size: 20000,
          industry: [
              "IT",
              "WEB"
          ],
          contact_details: {
              email: "google@gamail.com"
          },
          start_date: "12-10-2022"
      },
        status: "active"
      };

      respondResult = await app.inject({
        method: "POST",
        url: "/jobs",
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
      title: "Full stack Developer",
      job_description: {
        company_name: "google",
        location: {
            country: "USA",
            city: "New York"
        },
        job_types: [
            "full time",
            "remote"
        ],
        salary_offer_band: {
            currency: "USD",
            range: "100000$-200000$"
        },
        company_size: 20000,
        industry: [
            "IT",
            "WEB"
        ],
        contact_details: {
            email: "google@gamail.com"
        },
        start_date: "12-10-2022"
    },
      status: "active"
    });
  });
});
