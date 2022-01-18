const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const JobApplicantsRepo = requireRepo("job_applicants");
const SeekersRepo = requireRepo("seekers");
const JobsRepo = requireRepo("jobs");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test API JobApplicants/CanGetJobApplicants", () => {
  beforeAll(async () => {
    await truncateAllTables();
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("user_can_get_job_applicants", async () => {
    let respondResult;
    try {
      const app = httpServer();


      await JobsRepo.create({
        recruiter_uuid: "001",
        title: "Full stack Developer",
        job_description: {
          company: "betalectic IT solutions",
        },
        status: "active"
      });

      await SeekersRepo.create({
        user_uuid: contextClassRef.user.user_uuid,
        name: "Amarendra Varma",
        seeker_description: {
          gender: "male",
          age: 24,
          experience: "6 months",
          current_company: "Ink Pink IT Solutions",
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

      await JobApplicantsRepo.create({
        job_uuid: "e9d623ba-9507-4ae0-bf97-10b16370fec8",
        seeker_uuid: "e8d623ba-9507-4ae0-bf97-10b16370fec5",
        status: "Applicant Applied",
        meta: {
          applicant_details: {
            name: "Giridhar Varma",
            designation: "Full stack developer",
            work_experience: "2 years",
            area_of_specialization: "web development",
            contact: {
              phone: "9932211245",
              email: "giridharvarma@gmail.com",
            },
          },
          job_details: {
            title: "Full stack developer",
            company_name: "betalectic IT solutions",
            location: "Hyderabad",
            area_of_specialization: "Mobile app development",
            contact_details: {
              email: "contact@betalectic.com",
            },
          },
        },
      });

      respondResult = await app.inject({
        method: "GET",
        url: "/job-applicants",
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          job_uuid: "e9d623ba-9507-4ae0-bf97-10b16370fec8",
          seeker_uuid: "e8d623ba-9507-4ae0-bf97-10b16370fec5",
          status: "Applicant Applied",
          meta: {
            applicant_details: {
              name: "Giridhar Varma",
              designation: "Full stack developer",
              work_experience: "2 years",
              area_of_specialization: "web development",
              contact: {
                phone: "9932211245",
                email: "giridharvarma@gmail.com",
              },
            },
            job_details: {
              title: "Full stack developer",
              company_name: "betalectic IT solutions",
              location: "Hyderabad",
              area_of_specialization: "Mobile app development",
              contact_details: {
                email: "contact@betalectic.com",
              },
            },
          },
        }),
      ])
    );
  });
});
