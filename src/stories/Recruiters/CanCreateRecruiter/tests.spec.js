const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const randomUser = requireUtil("randomUser");
const contextClassRef = requireUtil("contextHelper");

describe("Test Handler Applicants/UserCanCreatePortfolio", () => {
  it("dummy_story_which_will_pass", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };
      result = await testStrategy("Applicants/UserCanCreatePortfolio", {
        prepareResult: {
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
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;

    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      user_uuid: expect.any(String),
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
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
