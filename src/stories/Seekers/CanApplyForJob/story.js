const findKeysFromRequest = requireUtil("findKeysFromRequest");
const JobsApplicants = requireRepo("job_applicants");
const validator = requireValidator();

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const payload = findKeysFromRequest(req, [
    "job_uuid",
    "seeker_uuid",
    "status",
    "meta",
  ]);
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
    job_uuid: {
      presence: {
        allowEmpty: false,
        message: "^Please provide job_uuid",
      },
    },
    seeker_uuid: {
      presence: {
        allowEmpty: false,
        message: "^Please enter seeker_uuid",
      },
    },
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    await validateInput(prepareResult);
    return await JobsApplicants.create(prepareResult);
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
