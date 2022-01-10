const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const contextClassRef = requireUtil("contextHelper");
const ApplicantsRepo = requireRepo("applicants");
const randomUser = requireUtil("randomUser");

describe("Test Handler Applicants/UserCanViewApplicant", () => {
  it("dummy_story_which_will_pass", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };

      const testQuery = await ApplicantsRepo.create({
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
      result = await testStrategy("Applicants/UserCanViewApplicant", {
        prepareResult: {
          uuid: testQuery.uuid,
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
    });
  });
});
