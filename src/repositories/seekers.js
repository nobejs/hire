const knex = requireKnex();
const baseRepo = requireUtil("baseRepo");

const create = async (payload) => {
  try {
    payload = baseRepo.addCreatedTimestamps(payload);
    let result = await knex.transaction(async (trx) => {
      const rows = await trx("seekers").insert(payload).returning("*");
      return rows[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllSeekers = async (query) => {
  try {
    if (query && query.tags && query.tags.length > 0) {
      var arr = query.tags.split(",");
      return await getSeekersByTags(arr);
    } else {
      const rows = knex("seekers").orderBy("created_at", "desc");
      return rows;
    }
  } catch (error) {
    throw error;
  }
};

const findByUuid = async (where = {}) => {
  return await baseRepo.first("seekers", where);
};

const getAllPostedSeekers = async (user_uuid) => {
  try {
    const rows = knex("seekers").where("user_uuid", user_uuid);
    return rows;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  const query = await knex("seekers").where({ uuid: id });
  if (query.length === 0) {
    return { message: "doesn't exist" };
  } else {
    const where = { uuid: id };
    //   await knex('seekers_tags').where({ query_uuid: where.uuid }).delete();
    await baseRepo.remove("seekers", where, "hard");
    //   await baseRepo.remove("seekers", where, "soft");
    return { message: "success" };
  }
};

const update = async (id, payload) => {
  try {
    payload["updated_at"] = new Date().toISOString();
    let result = await knex.transaction(async () => {
      let rows = await knex("seekers")
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
  getAllSeekers,
  findByUuid,
  getAllPostedSeekers,
  remove,
  update,
};
