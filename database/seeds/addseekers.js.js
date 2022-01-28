const faker = require('@faker-js/faker');

const createFakeSeekers = () => ({
  name: faker.name.findName(),
  user_uuid: faker.datatype.uuid(),
  seeker_description: {
    gender: faker.name.gender(),
    age: faker.datatype.number({
      min: 18,
      max: 75,
    }),
    experience: faker.datatype.number({
      min: 0,
      max: 60,
    }),
    current_company: faker.company.companyName(),
    designation: faker.name.jobTitle(),
    specialization_area: [faker.name.jobArea(), faker.name.jobArea()],
    top_skills: [
      faker.name.jobType(),
      faker.name.jobType(),
      faker.name.jobType(),
    ],
    achievements: [faker.lorem.sentence(), faker.lorem.sentence()],
    current_location: {
      country: faker.address.county(),
      city: faker.address.city(),
    },
    attachments: [faker.datatype.uuid(), faker.datatype.uuid()],
    contact_details: {
      email: faker.internet.email(),
      mobile: faker.phone.phoneNumber(),
      social_links: [faker.internet.url(), faker.internet.url()],
    },
    industry: [faker.name.jobArea(), faker.name.jobArea()],
  },
  open_to_work: {
    active: faker.datatype.boolean(),
    choose_who_can_see_you_are_open: ["recruiters_only", "all"][
      Math.floor(Math.random() * 2)
    ],
  },
  job_preferences: {
    location_preference: [faker.address.city(), faker.address.city()],
    start_date: faker.date.past(),
    job_types: [faker.name.jobType(), faker.name.jobType()],
    job_titles: [faker.name.jobTitle(), faker.name.jobTitle()],
    salary_preference: {
      from: faker.datatype.number({
        min: 10000,
        max: 30000,
      }),
      to: faker.datatype.number({
        min: 31000,
        max: 100000,
      }),
    },
    industry: [faker.name.jobArea(), faker.name.jobArea()],
    company_type: ["start-up", "commercial"][Math.floor(Math.random() * 2)],
    company_employee_strength: faker.datatype.number({
      min: 10,
      max: 100000,
    }),
    current_salary: {
      currency: faker.finance.currencyCode(),
      range: {
        from: faker.datatype.number({
          min: 10000,
          max: 30000,
        }),
        to: faker.datatype.number({
          min: 31000,
          max: 100000,
        }),
      },
    },
    note_for_recruiter: faker.lorem.sentence(),
    notice_period: faker.datatype.number({
      min: 0,
      max: 200,
    }),
  },
  created_at: faker.date.past(),
  updated_at: faker.date.past(),
});

exports.seed = async function (knex, Promise) {

  const fakeSeekers = [];
  const desiredFakeSeekers = 1000;
  for (let i = 0; i < desiredFakeSeekers; i++) {
    fakeSeekers.push(createFakeSeekers());
  }
  await knex('seekers').insert(fakeSeekers);
};
