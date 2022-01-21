const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();
const randomUser = requireUtil("randomUser");
const contextClassRef = requireUtil("contextHelper");
const truncateAllTables = requireFunction("truncateAllTables");

describe("Test Handler CanCreateRecruiter", () => {
  beforeEach(async () => {
    await truncateAllTables();
  });
  it("can_create_recruiter", async () => {
    let result = {};
    try {
      contextClassRef.user = randomUser();
      contextClassRef.headers = {
        Authorization: `Bearer ${contextClassRef.user.token}`,
      };
      
      result = await testStrategy("Recruiters/CanCreateRecruiter", {
        prepareResult: {
          user_uuid: contextClassRef.user.user_uuid,
          name: "hr 1110",
          recruiter_type: "in-house",
          recruiter_description: {
            type: "company"
          },
          currently_hiring: true
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;

    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      user_uuid: expect.any(String),
      name: "hr 1110",
      recruiter_type: "in-house",
      recruiter_description: {
        type: "company"
      },
      currently_hiring: true
    });
  });
});
