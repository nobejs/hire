exports.up = async function (knex) {
  await knex.raw(`create extension if not exists "uuid-ossp"`);
  return await knex.schema.createTable("jobs", function (table) {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("user_uuid", 255).notNullable();
    table.string("company_name", 255).notNullable();
    table.string("title", 255).notNullable();
    table.string("experience", 255).notNullable();
    table.jsonb("location").nullable();
    table.text("description").nullable();
    table.specificType("requirements_attachments", "TEXT[]").nullable();
    table.specificType("top_skills", "TEXT[]");
    table.string("employment_type", 255).nullable();
    table.jsonb("salary_offer_band").nullable();
    table.text("about_company").nullable();
    table.string("company_size", 255).nullable();
    table.string("industry", 255).nullable();
    table.string("specialization_area", 255).nullable();
    table.string("notice_period_acceptance", 255).nullable();
    table.text("note_for_applicants").nullable();
    table.specificType("applicants", "TEXT[]").nullable();
    table.timestamps();
    table.date("deleted_at").nullable();
  });
};

exports.down = async function (knex) {
  return await knex.schema.dropTable("jobs");
};
