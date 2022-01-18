const knex = requireKnex();
const baseRepo = requireUtil("baseRepo");

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

const getAllJobs = async (query) => {
  try {
    const rows = knex("jobs")
      .orderBy("created_at", "desc")
      .where("deleted_at", null);
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
  const job = await knex("jobs").where({ uuid: id });
  if (job.length === 0) {
    return { message: "Not found" };
  } else {
    const where = { uuid: id };
    await baseRepo.remove("jobs", where, "soft");
    return { message: "success" };
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

const searchJobs = async (payload) => {
  try {
    let {
      location,
      designation,
      work_experience,
      industry,
      salary,
      user_uuid,
    } = payload;

    const rows = await knex("jobs")
      .whereRaw("job_description->>? = ?", ["location", location])
      .where("title", designation);

    // );
    // const rows = knex("jobs")
    //   .orderBy("created_at", "desc")
    //   .where("location", location)
    //   .where("designation", designation)
    //   .where("work_experience", work_experience)
    //   .where("industry", industry)
    //   .where("salary", salary)
    //   .where("deleted_at", null);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getAllJobs,
  findByUuid,
  getAllPostedJobs,
  remove,
  update,
  searchJobs,
};
