const RecruiterRepo = requireRepo("recruiters");

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  return reqParams;
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

const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    return await RecruiterRepo.findByUuid({
      uuid: prepareResult.uuid,
    });
  } catch (error) {
    throw error;
  }
};

const respond = async ({ handleResult }) => {
  try {
    return await handleResult;
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
