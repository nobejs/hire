exports.up = async function (knex, Promise) {
  return knex.schema.table("job_applicants", function (table) {
    table.string("status", 255).nullable();
    table.jsonb("meta").nullable();
  });
};

exports.down = async function (knex, Promise) {
  return knex.schema.table("job_applicants", function (table) {
    table.dropColumn("status");
    table.dropColumn("meta");
  });
};
