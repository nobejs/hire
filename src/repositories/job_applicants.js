const knex = requireKnex();
const baseRepo = requireUtil("baseRepo");

const create = async (payload) => {
  try {
    payload = baseRepo.addCreatedTimestamps(payload);
    let result = await knex.transaction(async (trx) => {
      const rows = await trx("job_applicants").insert(payload).returning("*");
      return rows[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllJobApplicants = async (query) => {
  try {
    if (query && query.tags && query.tags.length > 0) {
      var arr = query.tags.split(",");
      return await getJobApplicantsByTags(arr);
    } else {
      const rows = knex("job_applicants").orderBy("created_at", "desc");
      return rows;
    }
  } catch (error) {
    throw error;
  }
};

const findByUuid = async (where = {}) => {
  return await baseRepo.first("job_applicants", where);
};

const getAllPostedJobApplicants = async (user_uuid) => {
  try {
    const rows = knex("job_applicants").where("user_uuid", user_uuid);
    return rows;
  } catch (error) {
    throw error;
  }
};

const remove = async (id, user) => {
  const query = await knex("job_applicants").where({ uuid: id });
  if (query.length === 0) {
    return { message: "doesn't exist" };
  } else {
    if (query[0].user_uuid !== user) {
      return { message: "Not authorized" };
    } else {
      const where = { uuid: id };
      //   await knex('applicants_tags').where({ query_uuid: where.uuid }).delete();
      await baseRepo.remove("job_applicants", where, "hard");
      //   await baseRepo.remove("job_applicants", where, "soft");
      return { message: "success" };
    }
  }
};

const update = async (id, payload) => {
  try {
    await knex("applicants_tags").where({ uuid: id }).delete();
    payload["updated_at"] = new Date().toISOString();
    let result = await knex.transaction(async () => {
      let rows = await knex("job_applicants")
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

module.exports = {
  create,
  getAllJobApplicants,
  findByUuid,
  getAllPostedJobApplicants,
  remove,
  update,
};
