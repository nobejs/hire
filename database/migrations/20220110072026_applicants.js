exports.up = async function (knex) {
  await knex.raw(`create extension if not exists "uuid-ossp"`);
  return await knex.schema.createTable("applicants", function (table) {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("user_uuid", 255).notNullable();
    table.string("full_name", 255).notNullable();
    table.string("gender", 255).notNullable();
    table.integer("age").notNullable();
    table.string("experience").nullable();
    table.string("current_company", 255).nullable();
    table.string("designation", 255).nullable();
    table.jsonb("current_salary").nullable();
    table.string("notice_period", 255).nullable();
    table.string("industry", 255).nullable();
    table.string("specialization_area", 255).nullable();
    table.specificType("top_skills", "TEXT[]").nullable();
    table.text("achievements").nullable();
    table.jsonb("current_location").nullable();
    table.string("location_preference", 255).nullable();
    table.specificType("attachments", "TEXT[]").nullable();
    table.text("note_for_recruiter").nullable();
    table.boolean("looking_for_job").nullable().defaultTo(0);
    table.timestamps();
    table.date("deleted_at").nullable();
  });
};

exports.down = async function (knex) {
  return await knex.schema.dropTable("applicants");
};
