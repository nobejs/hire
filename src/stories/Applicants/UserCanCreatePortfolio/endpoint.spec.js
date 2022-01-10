const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();

describe("Test API Applicants/UserCanCreatePortfolio", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`,
    };
  });

  it("dummy_story_which_will_pass", async () => {
    let respondResult;
    try {
      const app = httpServer();

      const payload = {
        user_uuid: contextClassRef.user.user_uuid,
        full_name: "Amarendra Varma",
        gender: "Male",
        age: 23,
        experience: "6 months",
        current_company: "Betalectic IT solutions Pvt Ltd.,",
        designation: "Full stack developer",
        current_salary: {
          currency: "INR",
          range: {
            from: "230000",
            to: "260000",
          },
        },
        notice_period: "10 days",
        industry: "IT - Information Technology",
        specialization_area:
          "Full stack web developement, Application Developement",
        top_skills: ["Node Js", "React Js", "Next Js"],
        achievements: "",
        current_location: {
          country: "India",
          city: "Hyderabad",
        },
        location_preference: "Hyderabad",
        attachments: [],
        note_for_recruiter:
          "If I will need Job, work from home for 6 months due to health reasons",
        looking_for_job: false,
      };

      respondResult = await app.inject({
        method: "POST",
        url: "/portfolio",
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
      full_name: "Amarendra Varma",
      gender: "Male",
      age: 23,
      experience: "6 months",
      current_company: "Betalectic IT solutions Pvt Ltd.,",
      designation: "Full stack developer",
      current_salary: {
        currency: "INR",
        range: {
          from: "230000",
          to: "260000",
        },
      },
      notice_period: "10 days",
      industry: "IT - Information Technology",
      specialization_area:
        "Full stack web developement, Application Developement",
      top_skills: ["Node Js", "React Js", "Next Js"],
      achievements: "",
      current_location: {
        country: "India",
        city: "Hyderabad",
      },
      location_preference: "Hyderabad",
      attachments: [],
      note_for_recruiter:
        "If I will need Job, work from home for 6 months due to health reasons",
      looking_for_job: false,
    });
  });
});
