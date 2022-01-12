const findKeysFromRequest = requireUtil("findKeysFromRequest");
const JobsRepo = requireRepo("jobs");
const validator = requireValidator();

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const payload = findKeysFromRequest(req, [
    "company_name",
    "title",
    "experience",
    "location",
    "description",
    "requirements_attachments",
    "top_skills",
    "employment_type",
    "salary_offer_band",
    "about_company",
    "company_size",
    "industry",
    "specialization_area",
    "notice_period_acceptance",
    "note_for_applicants",
    "applicants",
  ]);
  payload["user_uuid"] = req.user;
  return payload;
};

const authorize = async ({ prepareResult }) => {
  try {
    if (0) {
      throw {
        statusCode: 401,
        message: "Unauthorized",
      };
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const validateInput = async (prepareResult) => {
  const constraints = {
    user_uuid: {
      presence: {
        allowEmpty: false,
        message: "^Please provide user_uuid",
      },
    },
    company_name: {
      presence: {
        allowEmpty: false,
        message: "^Please enter company_name",
      },
    },
    title: {
      presence: {
        allowEmpty: false,
        message: "^Please enter job_title",
      },
    },
    experience: {
      presence: {
        allowEmpty: false,
        message: "^Please enter experience",
      },
    },
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    await validateInput(prepareResult);
    return await JobsRepo.create(prepareResult);
  } catch (error) {
    throw error;
  }
};

const respond = async ({ handleResult }) => {
  try {
    return handleResult;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
