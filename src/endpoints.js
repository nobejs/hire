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
        ["post", "/job", "Jobs/UserCanPostJob"],
        ["put", "/job/:uuid", "Jobs/UserCanUpdateJob"],
        ["get", "/jobs", "Jobs/UserCanViewAllJobs"],
        ["get", "/job/:uuid", "Jobs/UserCanViewJob"],
        ["post", "/portfolio", "Applicants/UserCanCreatePortfolio"],
        ["get", "/applicants", "Applicants/UserCanViewApplicants"],
        ["get", "/applicant/:uuid", "Applicants/UserCanViewApplicant"],
      ],
    },
  ];
};
