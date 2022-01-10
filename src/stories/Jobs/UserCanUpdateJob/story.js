const findKeysFromRequest = requireUtil("findKeysFromRequest");
const JobsRepo = requireRepo("jobs");
const validator = requireValidator();

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  return { reqBody, reqParams };
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
    const { reqBody, reqParams } = prepareResult;
    await validateInput(reqBody);
    return await JobsRepo.update(reqParams.uuid, reqBody);
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
