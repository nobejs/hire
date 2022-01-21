const JobsRepo = requireRepo("jobs");

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  try {
    return reqParams;
  }
  catch (error) {
    console.log(error,"prepare-err")
    throw error;
  }
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
    console.log(error, "auth-err")
    throw error;
  }
};

const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    return await JobsRepo.remove(prepareResult.uuid);
  } catch (error) {
    console.log(error, "handle-error")
    throw error;
  }
};

const respond = async ({ handleResult }) => {
  try {
    return handleResult;
  } catch (error) {
    console.log(error, "respond-error")
    throw error;
  }
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
