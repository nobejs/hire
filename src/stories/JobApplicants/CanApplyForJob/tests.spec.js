const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const randomUser = requireUtil("randomUser");
const contextClassRef = requireUtil("contextHelper");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test Handler JobApplicants/CanApplyForJob", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });
  it("user_can_apply_for_job", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };
      result = await testStrategy("JobApplicants/CanApplyForJob", {
        prepareResult: {
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
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(respondResult).toMatchObject({
      job_uuid: expect.any(String),
      seeker_uuid: expect.any(String),
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
  });
});
