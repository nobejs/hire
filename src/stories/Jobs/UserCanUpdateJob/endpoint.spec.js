const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const JobsRepo = requireRepo("jobs");

describe("Test API Jobs/UserCanUpdateJob", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("dummy_story_which_will_pass", async () => {
    let respondResult;
    try {
      const app = httpServer();
      const testQuery = await JobsRepo.create({
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

      const payload = {
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
      };

      respondResult = await app.inject({
        method: "PUT",
        url: `/jobs/${testQuery.uuid}`,
        payload,
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
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
    });
  });
});
