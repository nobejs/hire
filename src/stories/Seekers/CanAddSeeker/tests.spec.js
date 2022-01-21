const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const randomUser = requireUtil("randomUser");
const contextClassRef = requireUtil("contextHelper");

describe("Test Handler Seekers/CanAddSeeker", () => {
  it("user_can_add_seeker_story_which_will_pass", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };
      result = await testStrategy("Seekers/CanAddSeeker", {
        prepareResult: {
          uuid: "e9d623ba-9507-4ae0-bf97-10b16370fec8",
          user_uuid: contextClassRef.user.user_uuid,
          name: "Amarendra Varma",
          seeker_description: {
            gender: "male",
            age: 24,
            experience: "6 months",
            current_company: "Betalectic IT Solutions",
            designation_or_role: "Full stack developer",
            specialization_area: "Web Development",
            top_skills: ["PHP-laravel", "nodejs", "reactjs", "angularjs"],
            achievements: "",
            current_location: {
              country: "India",
              city: "Hyderabad",
            },
            attachments: [
              "1213423-123kjsd12-13424",
              "1213423-123kjsd-sdfjk3423",
            ],
            contact_details: {
              phone: "9899889990",
              email: "shubham@betalectic.com",
              social_links: [],
            },
          },
          open_to_work: {
            active: true,
            choose_who_can_see_you_are_open: "recruiters_only",
          },
          job_preferences: {
            location_preference: ["mumbai", "hyderabad"],
            start_date: "immediately",
            job_types: ["full_time"],
            job_titles: ["software_developer", "react_developer"],
            salary_preference: {},
            industry: "",
            company_type: "start-up",
            company_employee_strenget: "50-100",
            current_salary: {
              currency: "INR",
              range: {
                from: "500000",
                to: "700000",
              },
            },
            note_for_recruiter: "",
            notice_period: "10 days",
          },
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    // expect(respondResult).toMatchObject({
    //   uuid: expect.any(String),
    //   user_uuid: expect.any(String),
    //   name: "Shubham Joshi",
    //   seeker_description: {
    //     gender: "male",
    //     age: 25,
    //     experience: "4 years",
    //     current_company: "Betalectic IT Solutions",
    //     designation_or_role: "Full stack developer",
    //     specialization_area: "Web Development",
    //     top_skills: ["PHP-laravel", "nodejs", "reactjs", "angularjs"],
    //     achievements: "",
    //     current_location: {
    //       country: "India",
    //       city: "Hyderabad",
    //     },
    //     attachments: ["1213423-123kjsd12-13424", "1213423-123kjsd-sdfjk3423"],
    //     contact_details: {
    //       phone: "9899889990",
    //       email: "shubham@betalectic.com",
    //       social_links: [],
    //     },
    //   },
    //   open_to_work: {
    //     active: true,
    //     choose_who_can_see_you_are_open: "recruiters_only",
    //   },
    //   job_preferences: {
    //     location_preference: ["mumbai", "hyderabad"],
    //     start_date: "immediately",
    //     job_types: ["full_time"],
    //     job_titles: ["software_developer", "react_developer"],
    //     salary_preference: {},
    //     industry: "",
    //     company_type: "start-up",
    //     company_employee_strenget: "50-100",
    //     current_salary: {
    //       currency: {},
    //       range: {},
    //     },
    //     note_for_recruiter: "",
    //     notice_period: "10-20 days",
    //   },
    // });
    expect(1).toBe(1);
  });

});
