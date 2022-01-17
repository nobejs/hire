const SeekersRepo = requireRepo("seekers");

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
    return await SeekersRepo.findByUuid({
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
