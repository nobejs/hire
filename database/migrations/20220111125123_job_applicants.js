exports.up = async function (knex) {
  await knex.raw(`create extension if not exists "uuid-ossp"`);
  return await knex.schema.createTable("job_applicants", function (table) {
    table.string("job_uuid", 255).notNullable();
    table.string("seeker_uuid", 255).notNullable();
    table.timestamps();
    table.date("deleted_at").nullable();
  });
};

exports.down = async function (knex) {
  return await knex.schema.dropTable("job_applicants");
};
