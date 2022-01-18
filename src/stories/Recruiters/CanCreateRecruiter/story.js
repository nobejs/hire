const findKeysFromRequest = requireUtil("findKeysFromRequest");
const RecruiterRepo = requireRepo("recruiters");
const validator = requireValidator();

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const payload = findKeysFromRequest(req, [
    "name",
    "recruiter_type",
    "recruiter_description",
    "currently_hiring"
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
    name: {
      presence: {
        allowEmpty: false,
        message: "^Please enter full name",
      },
    },
    recruiter_type: {
      presence: {
        allowEmpty: false,
        message: "^Please enter recruiter type",
      },
    },
    recruiter_description: {
      presence: {
        allowEmpty: false,
        message: "^Please enter recruiter description",
      },
    },
    currently_hiring:{
      presence: {
        allowEmpty: false,
        message: "^Please enter hiring status",
      },
    }
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    await validateInput(prepareResult);
    return await RecruiterRepo.create(prepareResult);
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
