const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const randomUser = requireUtil("randomUser");
const contextClassRef = requireUtil("contextHelper");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test Handler CanPostJobWithRecruiter", () => {
  it("can_post_job_with_recruiter", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };
      result = await testStrategy("Jobs/CanPostJobWithRecruiter", {
        prepareResult: {
          user_uuid: contextClassRef.user.user_uuid,
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
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      recruiter: expect.any(Object),
      job: expect.any(Object),
    });
  });
});
