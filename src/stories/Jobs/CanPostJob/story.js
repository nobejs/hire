const findKeysFromRequest = requireUtil("findKeysFromRequest");
const JobsRepo = requireRepo("jobs");
const validator = requireValidator();

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  const payload = findKeysFromRequest(req, [
    "recruiter_uuid",
    "employer_id",
    "title",
    "job_description",
    "status"
  ]);
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
    recruiter_uuid: {
      presence: {
        allowEmpty: false,
        message: "^Please provide recruiter_uuid",
      },
    },
    title: {
      presence: {
        allowEmpty: false,
        message: "^Please enter job title",
      },
    },
    job_description: {
      presence: {
        allowEmpty: false,
        message: "^Please enter job description",
      },
    },
    status: {
      presence: {
        allowEmpty: false,
        message: "^Please enter job status",
      },
  }
}

  return validator(prepareResult, constraints);
};

const validateJobDetails = async (prepareResult) => {
  const constraints = {
    company_name: {
      presence: {
        allowEmpty: false,
        message: "^Please provide Comapny name",
      },
    },
    location: {
      presence: {
        allowEmpty: false,
        message: "^Please enter job location",
      },
    },
    job_types: {
      presence: {
        allowEmpty: false,
        message: "^Please enter job job types",
      },
    },
    salary_offer_band: {
      presence: {
        allowEmpty: false,
        message: "^Please enter salary offer band",
      },
  },
  company_size: {
    presence: {
      allowEmpty: false,
      message: "^Please provide Comapny size",
    },
  },
  industry: {
    presence: {
      allowEmpty: false,
      message: "^Please provide industry",
    },
  },
  contact_details: {
    presence: {
      allowEmpty: false,
      message: "^Please provide contact details",
    },
  },
  start_date: {
    presence: {
      allowEmpty: false,
      message: "^Please provide start date",
    },
  },
}

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult, authorizeResult }) => {
  try {
    await validateInput(prepareResult);
    await validateJobDetails(prepareResult.job_description);
    return await JobsRepo.create(prepareResult);
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
