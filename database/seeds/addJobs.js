const faker = require('@faker-js/faker');

const createFakeJobs = () => ({
  recruiter_uuid: faker.datatype.uuid(),
  title: faker.name.jobTitle(),
  employer_id: faker.datatype.uuid(),
  status: "open",
  job_description: {
    status: "open",
    job_query: faker.name.jobTitle(),
    company_name: faker.company.companyName(),
    location: {
      country: faker.address.county(),
      city: faker.address.city()
    },
    salary_offer_band: {
      currency: faker.finance.currencyCode(),
      range: {
        from: faker.datatype.number(
          {
            'min': 10000,
            'max': 30000
          }
        ),
        to: faker.datatype.number(
          {
            'min': 31000,
            'max': 100000
          }
        ),
      }
    },
    company_size: faker.datatype.number(
      {
        'min': 10,
        'max': 1000000
      }
    ),
    industry: [
      faker.name.jobArea(),
      faker.name.jobArea()
    ],
    contact_details: {
      email: faker.internet.email(),
      mobile: faker.phone.phoneNumber()
    },
    start_date: faker.date.past(),
    skills: [
      faker.name.jobType(),
      faker.name.jobType(),
      faker.name.jobType()
    ],
    experience: faker.datatype.number({
      'min': 12,
      'max': 120
    })
  },
  created_at:faker.date.past(),
  updated_at:faker.date.past()
});


exports.seed = async function (knex, Promise) {

  const fakeJobs = [];
  const desiredFakeJobs = 1000;
  for (let i = 0; i < desiredFakeJobs; i++) {
    fakeJobs.push(createFakeJobs());
  }
  await knex('jobs').insert(fakeJobs);
};

