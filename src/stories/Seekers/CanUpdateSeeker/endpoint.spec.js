const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const SeekersRepo = requireRepo("seekers");

describe("Test API Seekers/CanUpdateSeeker", () => {
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

      const testQuery = await SeekersRepo.create({
        user_uuid: contextClassRef.user.user_uuid,
        name: "Shubham Joshi",
        seeker_description: {
          gender: "male",
          age: 25,
          experience: "4 years",
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
            currency: {},
            range: {},
          },
          note_for_recruiter: "",
          notice_period: "10-20 days",
        },
      });

      const payload = {
        user_uuid: contextClassRef.user.user_uuid,
        name: "Rohan Sharma",
        seeker_description: {
          gender: "male",
          age: 27,
          experience: "4 years",
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
            currency: {},
            range: {},
          },
          note_for_recruiter: "",
          notice_period: "10-20 days",
        },
      };

      respondResult = await app.inject({
        method: "PUT",
        url: `/seekers/${testQuery.uuid}`, // This should be in endpoints.js
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
      name: "Rohan Sharma",
      seeker_description: {
        gender: "male",
        age: 27,
        experience: "4 years",
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
          currency: {},
          range: {},
        },
        note_for_recruiter: "",
        notice_period: "10-20 days",
      },
    });
  });
});
