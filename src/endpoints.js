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
        ["post", "/jobs", "Jobs/UserCanPostJob"],
        ["put", "/jobs/:uuid", "Jobs/UserCanUpdateJob"],
        ["get", "/jobs", "Jobs/UserCanViewAllJobs"],
        ["get", "/jobs/:uuid", "Jobs/UserCanViewJob"],
        ["post", "/portfolios", "Applicants/UserCanCreatePortfolio"],
        ["get", "/applicants", "Applicants/UserCanViewApplicants"],
        ["get", "/applicants/:uuid", "Applicants/UserCanViewApplicant"],
      ],
    },
  ];
};
