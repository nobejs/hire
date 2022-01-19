const knex = requireKnex();
const baseRepo = requireUtil("baseRepo");
const RecruiterRepo = requireRepo("recruiters");

const create = async (payload) => {
  try {
    payload = baseRepo.addCreatedTimestamps(payload);
    let result = await knex.transaction(async (trx) => {
      const rows = await trx("jobs").insert(payload).returning("*");
      return rows[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const createWithRecruiter = async (payload) => {
  try {
    let jobPayload = {};
    let recruiter = await knex('recruiters').where({ user_uuid: payload.user_uuid }).first();
    console.log(recruiter, "existing-rec");
    jobPayload = baseRepo.addCreatedTimestamps(jobPayload);
    jobPayload['title'] = payload.title;
    jobPayload['job_description'] = payload.job_description;
    jobPayload['status'] = payload.status;
    if (recruiter) {
      jobPayload['recruiter_uuid'] = recruiter.uuid;
      console.log(jobPayload, "job-payload")
      let result = await create(jobPayload);
      return {
        recruiter: recruiter,
        job: result
      };
    } else {
      console.log("else-else")
      const job = await createNewRecruiterAndJob(payload, jobPayload)
      return job;
    }
  } catch (error) {
    throw error;
  }
};


const getAllJobs = async (query) => {
  try {
    const rows = knex("jobs").orderBy("created_at", "desc").where('deleted_at', null);
    return rows;
  } catch (error) {
    throw error;
  }
};

const findByUuid = async (where = {}) => {
  return await baseRepo.first("jobs", where);
};

const getAllPostedJobs = async (user_uuid) => {
  try {
    const rows = knex("jobs").where("user_uuid", user_uuid);
    return rows;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try{
    const job = await knex("jobs").where({ uuid: id });
    if (job.length === 0) {
      return { message: "Not found" };
    } else {
      const where = { uuid: id };
      await baseRepo.remove("jobs", where, "soft");
      return { message: "success" };
    }
  }catch (error) {
    console.log(error,"remove-errr")
    throw error;
  }
};

const update = async (id, payload) => {
  try {
    payload["updated_at"] = new Date().toISOString();
    let result = await knex.transaction(async () => {
      let rows = await knex("jobs")
        .where({ uuid: id })
        .update(payload)
        .returning("*");

      return rows[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const createNewRecruiterAndJob = async (payload, jobPayload) => {
  try {
    let recruiterPayload = {}
    recruiterPayload['name'] = payload.recruiter_name;
    recruiterPayload['recruiter_type'] = payload.recruiter_type;
    recruiterPayload['currently_hiring'] = payload.currently_hiring;
    recruiterPayload['recruiter_description'] = payload.recruiter_description;
    recruiterPayload['user_uuid'] = payload.user_uuid;
    console.log(recruiterPayload, "else-rec-payload")
    const newRecruiter = await RecruiterRepo.create(recruiterPayload);
    console.log(newRecruiter, "new-recruiter")
    if (newRecruiter) {
      jobPayload['recruiter_uuid'] = newRecruiter.uuid;
      console.log('else-job-payload', jobPayload);
      let result = await knex.transaction(async (trx) => {
        const rows = await trx("jobs").insert(jobPayload).returning("*");
        return rows[0];
      });
      return {
        recruiter: newRecruiter,
        job: result
      };
    }

  } catch (error) {
    throw error;
  }
}

module.exports = {
  create,
  getAllJobs,
  findByUuid,
  getAllPostedJobs,
  remove,
  update,
  createWithRecruiter
};
