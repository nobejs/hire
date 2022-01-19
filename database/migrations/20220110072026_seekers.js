exports.up = async function (knex) {
  await knex.raw(`create extension if not exists "uuid-ossp"`);
  return await knex.schema.createTable("seekers", function (table) {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("user_uuid", 255).notNullable();
    table.string("name", 255).notNullable();
    table.jsonb("seeker_description").notNullable();
    table.jsonb("open_to_work").notNullable();
    table.jsonb("job_preferences").notNullable();
    table.timestamps();
    table.date("deleted_at").nullable();
  });
};

exports.down = async function (knex) {
  return await knex.schema.dropTable("seekers");
};
