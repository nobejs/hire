const findKeysFromRequest = requireUtil("findKeysFromRequest");
const JobsRepo = requireRepo("jobs");
const validator = requireValidator();

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const payload = findKeysFromRequest(req, [
    "location",
    "designation",
    "work_experience",
    "industry",
    "salary",
  ]);
  payload["user_uuid"] = req.user;
  return payload;
};

const authorize = async ({ prepareResult }) => {
  try {
    return true;
  } catch (error) {
    throw error;
  }
};

const validateInput = async (prepareResult) => {
  const constraints = {
    location: {
      presence: {
        allowEmpty: false,
        message: "^Please provide location",
      },
    },
    designation: {
      presence: {
        allowEmpty: false,
        message: "^Please enter designation",
      },
    },
    work_experience: {
      presence: {
        allowEmpty: false,
        message: "^Please enter work experience",
      },
    },
    industry: {
      presence: {
        allowEmpty: false,
        message: "^Please enter industry",
      },
    },
    salary: {
      presence: {
        allowEmpty: false,
        message: "^Please enter salary",
      },
    },
  };
  return validator(prepareResult, constraints);
};

const validateLocation = async (prepareResult) => {
  const constraints = {
    country: {
      presence: {
        allowEmpty: false,
        message: "^Please enter country",
      },
    },
    city: {
      presence: {
        allowEmpty: false,
        message: "^Please enter city",
      },
    },
  };

  return validator(prepareResult, constraints);
};

const validateSalaryRange = async (prepareResult) => {
  const constraints = {
    from: {
      presence: {
        allowEmpty: false,
        message: "^Please enter from salary",
      },
    },
    to: {
      presence: {
        allowEmpty: false,
        message: "^Please enter to salary",
      },
    },
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    await validateInput(prepareResult);
    await validateLocation(prepareResult.location);
    await validateSalaryRange(prepareResult.salary);
    return await JobsRepo.searchJobs(prepareResult);
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
