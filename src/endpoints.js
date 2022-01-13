module.exports = (app) => {
  app.get("/liveness", async (req, res) => {
    return res.code(200).send({ status: "I am alive" });
  });

  app.get("/readiness", async (req, res) => {
    return res.code(200).send({ status: "I am ready" });
  });

  return [
    {
      endpoints: [
        ["post", "/jobs", "Jobs/CanPostJob"],
        ["put", "/jobs/:uuid", "Jobs/CanUpdateJob"],
        ["get", "/jobs", "Jobs/CanViewAllJobs"],
        ["get", "/jobs/:uuid", "Jobs/CanViewJob"],
        ["delete", "/jobs/:uuid", "Jobs/canCloseJob"],
        ["post", "/seekers", "Seekers/CanAddSeeker"],
        ["put", "/seekers/:uuid", "Seekers/CanUpdateSeeker"],
        ["get", "/seekers", "Seekers/CanViewAllSeekers"],
        ["get", "/seekers/:uuid", "Seekers/CanViewSeeker"],
        ["delete", "/seekers/:uuid", "Seekers/CanDeleteSeeker"],
      ],
    },
  ];
};
