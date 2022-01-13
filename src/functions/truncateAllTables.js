const knex = requireKnex();

module.exports = async () => {
  await knex("jobs").truncate();
  await knex("seekers").truncate();
  await knex("recruiters").truncate();
  await knex("job_applicants").truncate();
};