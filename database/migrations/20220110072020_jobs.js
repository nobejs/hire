exports.up = async function (knex) {
  await knex.raw(`create extension if not exists "uuid-ossp"`);
  return await knex.schema.createTable("jobs", function (table) {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("recruiter_uuid", 255).notNullable();
    table.string("employer_id", 255).nullable();
    table.string("title", 255).notNullable();
    table.jsonb("job_description").notNullable();
    table.string("status", 255).notNullable();
    table.datetime("created_at");
    table.datetime("updated_at");
    table.datetime("deleted_at");
  });
};

exports.down = async function (knex) {
  return await knex.schema.dropTable("jobs");
};
