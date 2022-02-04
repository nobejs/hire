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
  return await knex("jobs").where(where).first();
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
  try {
    const job = await knex("jobs").where({ uuid: id });
    if (job.length === 0) {
      return { message: "Not found" };
    } else {
      const where = { uuid: id };
      await baseRepo.remove("jobs", where, "soft");
      return { message: "success" };
    }
  } catch (error) {
    console.log(error, "remove-errr")
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

const getRecruiterStories = async (data) => {
  const { user, query } = data;
  let recruiter = await knex('recruiters').where({ user_uuid: user }).first();
  if (recruiter && recruiter.uuid) {
    const recruiterId = recruiter.uuid;
    if (query && query.status && query.status.length > 0) {
      const rows = knex("jobs").where(
        {
          "recruiter_uuid": recruiterId,
          "status": query.status
        });

      return rows;
    } else {
      const rows = knex("jobs").where(
        {
          "recruiter_uuid": recruiterId
        });
      return rows;
    }
  } else {
    return { message: "recruiter not found" }
  }
}

const searchJob = async (job_payload) => {
  let where = {};

  try {
    let dataBuilder = knex('jobs')
      .where({
        ...where,
      })
    const per_page = job_payload.per_page || 10;
    const page = job_payload.page || 1;
    const sort_column = job_payload.sort_column || "updated_at";
    const sort_order = job_payload.sort_order || "desc";

    const searchArr = Object.keys(job_payload);

    for (let i = 0; i < searchArr.length; i++) {
      if (job_payload[searchArr[i]].type === 'equals') {
        let path = makeOrder(searchArr[i]);
        dataBuilder = dataBuilder.whereRaw(`${path} = ?`, job_payload[searchArr[i]].value);
      }
      else if (job_payload[searchArr[i]].type == 'like') {
        let path = makeOrder(searchArr[i]);
        dataBuilder = dataBuilder.whereRaw(`${path} ILIKE ?`, `%${job_payload[searchArr[i]].value}%`)
      }
      else if (job_payload[searchArr[i]].type === '>=') {
        let path = makeOrder(searchArr[i]);
        dataBuilder = dataBuilder.whereRaw(`${path} >= ?`, `${job_payload[searchArr[i]].value}`);
      }
      else if (job_payload[searchArr[i]].type === '<=') {
        let path = makeOrder(searchArr[i]);
        dataBuilder = dataBuilder.whereRaw(`${path} <= ?`, `${job_payload[searchArr[i]].value}`);
      }
      else if (job_payload[searchArr[i]].type === 'array') {
        const data = {}
        data[searchArr[i]] = job_payload[searchArr[i]].value;
        dataBuilder = dataBuilder.where(knex.raw(
          `?? @> ?::jsonb`,
          [
            'job_description',
            JSON.stringify(data)
          ]
        ))
      }
      else if (job_payload[searchArr[i]].type === 'arrayOr') {
        let path = makeOrder(searchArr[i]);
        const valueArr = job_payload[searchArr[i]].value;
        let str = ''
        for (let j = 0; j < valueArr.length; j++) {
          if (j >= 0 && j !== valueArr.length - 1) {
            str = str + `${path} = '${valueArr[j]}' or `;
          }
          else {
            str = str + `${path} = '${valueArr[j]}'`;
          }
        }
        dataBuilder = dataBuilder.whereRaw(str);
      }
      else {
        if (job_payload[searchArr[i]].type) {
          return { message: "type is invalid" }
        }
      }
    }
    let all = await dataBuilder
    let total = all.length;
    let rows = await dataBuilder
      .orderBy(sort_column, sort_order)
      .limit(per_page)
      .offset((page - 1) * per_page);

    let sql = await dataBuilder
      .orderBy(sort_column, sort_order)
      .limit(per_page)
      .offset((page - 1) * per_page)
      .toString();

    return { data: rows, meta: { page, per_page, total, sql } };

  } catch (error) {
    throw error;
  }
}

const makeOrder = (string) => {
  const pathArray = string.split('.')

  if (pathArray.length === 1) {
    return `job_description->>'${pathArray[0]}'`;
  }
  else {
    let result = 'job_description'
    for (let i = 0; i < pathArray.length; i++) {
      if (i >= 0 && i !== pathArray.length - 1) {
        result = result + `->'${pathArray[i]}'`
      }
      else {
        result = result + `->>'${pathArray[i]}'`
      }
    }
    return result;
  }
}

const getAppliedJobs = async (id) => {
  try {
    const seeker = await knex('seekers').where({ user_uuid: id }).first();
    if (seeker) {
      let jobIds = await knex.select('job_uuid').from('job_applicants').where({ seeker_uuid: seeker.uuid });
      jobIds = jobIds.map((jobId) => {
        return jobId.job_uuid;
      });
      const jobs = await getJobsByIds(jobIds);
      return jobs;
    } else {
      return { message: "Seeker doesn't exist" }
    }

  } catch (error) {
    throw error;
  }

}

const getJobsByIds = async (ids) => {
  const rows = await knex('jobs').where((builder) =>
    builder.whereIn('uuid', ids)
  );
  rows.promise = rows.then;
  rows.then = undefined;
  return rows;
}

module.exports = {
  create,
  getAllJobs,
  findByUuid,
  getAllPostedJobs,
  remove,
  update,
  createWithRecruiter,
  getRecruiterStories,
  searchJob,
  getAppliedJobs
};
