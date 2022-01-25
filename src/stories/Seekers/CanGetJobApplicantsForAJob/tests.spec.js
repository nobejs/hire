const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const JobApplicantsRepo = requireRepo("job_applicants");
const SeekersRepo = requireRepo("seekers");
const JobsRepo = requireRepo("jobs");
const randomUser = requireUtil("randomUser");
const contextClassRef = requireUtil("contextHelper");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test Handler Seekers/CanGetJobApplicantsForAJob", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });
  it("user_can_get_job_applicants_for_a_job", async () => {
    let result = {};

    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };

      const jobsQuery = await JobsRepo.create({
        recruiter_uuid: "ba5c3710-a369-432f-af22-70443fa291e2",
        employer_id: "bdff83ab-acdb-4366-83b1-1f6c432f20e8",
        title: "Internal Marketing Manager",
        job_description: {
          skills: ["Agent", "Engineer", "Facilitator"],
          industry: ["Interactions", "Factors"],
          location: {
            city: "Pfannerstillborough",
            country: "Buckinghamshire",
          },
          experience: 65,
          start_date: "2021-02-02T11:12:55.788Z",
          company_name: "Feeney, Kuvalis and Leffler",
          company_size: 538455,
          contact_details: {
            email: "Cleta.Gutkowski11@yahoo.com",
            mobile: "(284) 425-6912",
          },
          salary_offer_band: {
            range: {
              to: 46152,
              from: 23669,
            },
            currency: "PHP",
          },
        },
        status: "open",
      });

      const seekersQuery = await SeekersRepo.create({
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
          company_employee_strength: "50-100",
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
        job_uuid: jobsQuery.uuid,
        seeker_uuid: seekersQuery.uuid,
        status: "Applicant Applied",
        meta: {
          applicant_details: {
            name: "Amarendra Varma",
            designation: "Full stack developer",
            work_experience: "2 years",
            area_of_specialization: "web development",
            contact: {
              phone: "9899889990",
              email: "shubham@betalectic.com",
            },
          },
          job_details: {
            title: "Internal Marketing Manager",
            company_name: "Feeney, Kuvalis and Leffler",
            location: "Pfannerstillborough",
            area_of_specialization: "Mobile app development",
            contact_details: {
              email: "Cleta.Gutkowski11@yahoo.com",
            },
          },
        },
      });
      result = await testStrategy("Seekers/CanGetJobApplicantsForAJob", {
        prepareResult: {
          uuid: jobsQuery.uuid,
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
          user_uuid: expect.any(String),
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
            company_employee_strength: "50-100",
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
        }),
      ])
    );
  });
});
