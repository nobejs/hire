const findKeysFromRequest = requireUtil("findKeysFromRequest");
const ApplicantsRepo = requireRepo("applicants");
const validator = requireValidator();

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const payload = findKeysFromRequest(req, [
    "full_name",
    "gender",
    "age",
    "experience",
    "current_company",
    "designation",
    "current_salary",
    "notice_period",
    "industry",
    "specialization_area",
    "top_skills",
    "achievements",
    "current_location",
    "location_preference",
    "attachments",
    "note_for_recruiter",
    "looking_for_job",
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
    full_name: {
      presence: {
        allowEmpty: false,
        message: "^Please enter full_name",
      },
    },
    gender: {
      presence: {
        allowEmpty: false,
        message: "^Please enter gender",
      },
    },
    age: {
      presence: {
        allowEmpty: false,
        message: "^Please enter age",
      },
    },
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    await validateInput(prepareResult);
    return await ApplicantsRepo.create(prepareResult);
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
