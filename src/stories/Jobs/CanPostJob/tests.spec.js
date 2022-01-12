const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const randomUser = requireUtil("randomUser");
const contextClassRef = requireUtil("contextHelper");

describe("Test Handler UserCanPostJob", () => {
  it("dummy_story_which_will_pass", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };
      result = await testStrategy("Jobs/UserCanPostJob", {
        prepareResult: {
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
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      user_uuid: expect.any(String),
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
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
