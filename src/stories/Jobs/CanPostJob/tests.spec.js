const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const randomUser = requireUtil("randomUser");
const contextClassRef = requireUtil("contextHelper");

describe("Test Handler UserCanPostJob", () => {
  it("can_post_job", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };
      result = await testStrategy("Jobs/CanPostJob", {
        prepareResult: {
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
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      recruiter_uuid: "001",
      title: "Full stack Developer",
      job_description: { company_name: "google",
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
