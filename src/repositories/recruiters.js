const knex = requireKnex();
const baseRepo = requireUtil("baseRepo");

const create = async (payload) => {
  try {
    payload = baseRepo.addCreatedTimestamps(payload);
    let result = await knex.transaction(async (trx) => {
      const rows = await trx("recruiters").insert(payload).returning("*");
      return rows[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllRecruiters = async () => {
  try {
    const rows = knex("recruiters").orderBy("created_at", "desc");
    return rows;
  } catch (error) {
    throw error;
  }
};

const findByUuid = async (where = {}) => {
  return await baseRepo.first("recruiters", where);
};




module.exports = {
  create,
  getAllRecruiters,
  findByUuid,
};
