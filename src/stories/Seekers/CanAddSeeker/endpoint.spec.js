const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();

describe("Test API Seekers/CanAddSeeker", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("user_can_add_seeker_story_which_will_pass", async () => {
    let respondResult;
    try {
      const app = httpServer();

      const payload = {
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
          attachments: ["1213423-123kjsd12-13424", "1213423-123kjsd-sdfjk3423"],
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
      };

      respondResult = await app.inject({
        method: "POST",
        url: "/seekers",
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
        attachments: ["1213423-123kjsd12-13424", "1213423-123kjsd-sdfjk3423"],
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
    });
  });
});
