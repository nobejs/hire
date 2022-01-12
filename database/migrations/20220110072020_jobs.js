exports.up = async function (knex) {
  await knex.raw(`create extension if not exists "uuid-ossp"`);
  return await knex.schema.createTable("jobs", function (table) {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("recruiter_uuid", 255).notNullable();
    table.jsonb("job_description").notNullable();
    table.string("status", 255).notNullable();
    table.timestamps();
    table.date("deleted_at").nullable();
  });
};

exports.down = async function (knex) {
  return await knex.schema.dropTable("jobs");
};
