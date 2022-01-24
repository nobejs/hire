const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test API Seekers/CanApplyForJob", () => {
  beforeAll(async () => {
    await truncateAllTables();
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("user_can_apply_for_job", async () => {
    let respondResult;
    try {
      const app = httpServer();

      const payload = {
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
      };

      respondResult = await app.inject({
        method: "POST",
        url: "/seekers/apply-for-job", // This should be in endpoints.js
        payload,
        headers: contextClassRef.headers,
      });
    } catch (error) {
      respondResult = error;
    }

    //
    // expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
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
