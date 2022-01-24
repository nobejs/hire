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

const getJobApplicants = async (id) => {
  try {
    if (id) {
      const foundedSeekersUuids = await getSeekersIdsForJob(id);

      const data = await Promise.all(
        foundedSeekersUuids.map(async ({ seeker_uuid }) => {
          return await getSeeker(seeker_uuid);
        })
      );
      return data;
    }
  } catch (error) {
    throw error;
  }
};

const getSeeker = async (id) => {
  try {
    const seeker = await knex("seekers")
      .orderBy("created_at", "desc")
      .where("uuid", id)
      .where("deleted_at", null);
    return seeker[0];
  } catch (error) {
    throw error;
  }
};

const getSeekersIdsForJob = async (id) => {
  try {
    return await knex("job_applicants")
      .select("seeker_uuid")
      .orderBy("created_at", "desc")
      .where("job_uuid", id)
      .where("deleted_at", null);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getJobApplicants,
};
