const findKeysFromRequest = requireUtil("findKeysFromRequest");
const SeekersRepo = requireRepo("seekers");
const validator = requireValidator();

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  return req.user;
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
    return await SeekersRepo.getSeekerByUserId(prepareResult);
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
