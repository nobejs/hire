const findKeysFromRequest = requireUtil("findKeysFromRequest");
const SeekersRepo = requireRepo("seekers");
const validator = requireValidator();

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const payload = findKeysFromRequest(req, [
    "name",
    "seeker_description",
    "open_to_work",
    "job_preferences",
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
    name: {
      presence: {
        allowEmpty: false,
        message: "^Please provide name",
      },
    },
    seeker_description: {
      presence: {
        allowEmpty: false,
        message: "^Please enter seeker_description",
      },
    },
    open_to_work: {
      presence: {
        allowEmpty: false,
        message: "^Please enter open_to_work",
      },
    },
    job_preferences: {
      presence: {
        allowEmpty: false,
        message: "^Please enter job_preferences",
      },
    },
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    await validateInput(prepareResult);
    return await SeekersRepo.create(prepareResult);
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
