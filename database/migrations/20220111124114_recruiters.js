exports.up = async function (knex) {
  await knex.raw(`create extension if not exists "uuid-ossp"`);
  return await knex.schema.createTable("recruiters", function (table) {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("user_uuid", 255).notNullable();
    table.string("name", 255).notNullable();
    table.string("recruiter_type", 255).nullable();
    table.jsonb("recruiter_description").nullable();
    table.boolean("currently_hiring", 255).nullable();
    table.datetime("created_at");
    table.datetime("updated_at");
    table.datetime("deleted_at");
  });
};

exports.down = async function (knex) {
  return await knex.schema.dropTable("recruiters");
};
