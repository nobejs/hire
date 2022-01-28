const JobApplicants = requireRepo("job_applicants");

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  return reqParams;
};

const authorize = async ({ prepareResult }) => {
  try {
    return true;
  } catch (error) {
    throw error;
  }
};

const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    return await JobApplicants.getJobApplicants(prepareResult.uuid);
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
