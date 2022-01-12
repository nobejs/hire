const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const JobsRepo = requireRepo("jobs");

describe("Test Handler Jobs/UserCanViewAllJobs", () => {
  it("dummy_story_which_will_pass", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };
      await JobsRepo.create({
        user_uuid: contextClassRef.user.user_uuid,
        company_name: "Betalectic Pvt Lts",
        title: "Software Engineer",
        experience: "1 year",
        location: {
          country: "India",
          city: "Hyderabad",
        },
        description: "",
        requirements_attachments: [],
        top_skills: ["React JS", "Node JS"],
        employment_type: "private",
        salary_offer_band: {
          currency: "INR",
          range: {
            from: "500000",
            to: "600000",
          },
        },
        about_company: "Open Source IT Projects Private Ltd",
        company_size: "10-15",
        industry: "IT - Information Technology",
        specialization_area: "SAP, Web Development",
        notice_period_acceptance: "1 Week",
        note_for_applicants: "",
        applicants: [],
      });
      result = await testStrategy("Jobs/UserCanViewAllJobs", {
        prepareResult: {
          reqQuery: {},
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uuid: expect.any(String),
          user_uuid: contextClassRef.user.user_uuid,
          company_name: "Betalectic Pvt Lts",
          title: "Software Engineer",
          experience: "1 year",
          location: {
            country: "India",
            city: "Hyderabad",
          },
          description: "",
          requirements_attachments: [],
          top_skills: ["React JS", "Node JS"],
          employment_type: "private",
          salary_offer_band: {
            currency: "INR",
            range: {
              from: "500000",
              to: "600000",
            },
          },
          about_company: "Open Source IT Projects Private Ltd",
          company_size: "10-15",
          industry: "IT - Information Technology",
          specialization_area: "SAP, Web Development",
          notice_period_acceptance: "1 Week",
          note_for_applicants: "",
          applicants: [],
        }),
      ])
    );
  });
});
