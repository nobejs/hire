const knex = requireKnex();
const baseRepo = requireUtil("baseRepo");

const create = async (payload) => {
  try {
    payload = baseRepo.addCreatedTimestamps(payload);
    let seeker = await knex('seekers').where({ user_uuid: payload.user_uuid }).first();
    if (seeker) {
      return { message: "Already Exist" }
    }
    else {
      let result = await knex.transaction(async (trx) => {
        const rows = await trx("seekers").insert(payload).returning("*");
        return rows[0];
      });
      return result;
    }
  } catch (error) {
    throw error;
  }
};

const getAllSeekers = async (query) => {
  try {
    return await knex("seekers").orderBy("created_at", "desc").where('deleted_at', null);
  } catch (error) {
    throw error;
  }
};

const findByUuid = async (where = {}) => {
  return await baseRepo.first("seekers", where);
};

const remove = async (id) => {
  const query = await knex("seekers").where({ uuid: id });
  if (query.length === 0) {
    return { message: "Not found" };
  } else {
    const where = { uuid: id };
    await baseRepo.remove("seekers", where, "hard");
    return { message: "success" };
  }
};

const update = async (id, payload) => {
  try {
    payload["updated_at"] = new Date().toISOString();
    let result = await knex.transaction(async () => {
      let rows = await knex("seekers")
        .where({ uuid: id })
        .update(payload)
        .returning("*");

      return rows[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const searchSeekers = async (payload) => {
  let where = {};

  try {
    let dataBuilder = knex('seekers')
      .where({
        ...where,
      })
    const per_page = payload.per_page || 10;
    const page = payload.page || 1;
    const sort_column = payload.sort_column || "updated_at";
    const sort_order = payload.sort_order || "desc";

    const searchArr = Object.keys(payload);

    for (let i = 0; i < searchArr.length; i++) {
      if (payload[searchArr[i]].type === 'equals') {
        let path = makeOrder(searchArr[i]);
        dataBuilder = dataBuilder.whereRaw(`${path} = ?`, payload[searchArr[i]].value);
      }
      else if (payload[searchArr[i]].type == 'like') {
        let path = makeOrder(searchArr[i]);
        dataBuilder = dataBuilder.whereRaw(`${path} ILIKE ?`, `%${payload[searchArr[i]].value}%`)
      }
      else if (payload[searchArr[i]].type === '>=') {
        let path = makeOrder(searchArr[i]);
        dataBuilder = dataBuilder.whereRaw(`${path} >= ?`, `${payload[searchArr[i]].value}`);
      }
      else if (payload[searchArr[i]].type === '<=') {
        let path = makeOrder(searchArr[i]);
        dataBuilder = dataBuilder.whereRaw(`${path} <= ?`, `${payload[searchArr[i]].value}`);
      }
      else if (payload[searchArr[i]].type === 'array') {
        const data = {}
        data[searchArr[i]] = payload[searchArr[i]].value;
        dataBuilder = dataBuilder.where(knex.raw(
          `?? @> ?::jsonb`,
          [
            'seeker_description',
            JSON.stringify(data)
          ]
        ))
      }
      else if (payload[searchArr[i]].type === 'arrayOr') {
        let path = makeOrder(searchArr[i]);
        const valueArr = payload[searchArr[i]].value;
        let str = ''
        for (let j = 0; j < valueArr.length; j++) {
          if (j >= 0 && j !== valueArr.length - 1) {
            str = str + `${path} = '${valueArr[j]}' or `;
          }
          else {
            str = str + `${path} = '${valueArr[j]}'`;
          }
        }
        dataBuilder = dataBuilder.whereRaw(str);
      }
      else {
        if (payload[searchArr[i]].type) {
          return { message: "type is invalid" }
        }
      }
    }
    let all = await dataBuilder
    let total = all.length;
    let rows = await dataBuilder
      .orderBy(sort_column, sort_order)
      .limit(per_page)
      .offset((page - 1) * per_page);

    let sql = await dataBuilder
      .orderBy(sort_column, sort_order)
      .limit(per_page)
      .offset((page - 1) * per_page)
      .toString();

    return { data: rows, meta: { page, per_page, total, sql: sql.replace("/", " ") } };

  } catch (error) {
    throw error;
  }
}

const makeOrder = (string) => {
  const pathArray = string.split('.')

  if (pathArray.length === 1) {
    return `seeker_description->>'${pathArray[0]}'`;
  }
  else {
    let result = 'seeker_description'
    for (let i = 0; i < pathArray.length; i++) {
      if (i >= 0 && i !== pathArray.length - 1) {
        result = result + `->'${pathArray[i]}'`
      }
      else {
        result = result + `->>'${pathArray[i]}'`
      }
    }
    return result;
  }
}

const getSeekerByUserId = async(id)=>{
  try{
    const seeker = await knex('seekers').where({ user_uuid: id }).first();
    if(seeker){
      return seeker;
    }else{
      return {message: "Seeker doesn't exist"}
    }
  }catch (error) {
    throw error;
  }
}

module.exports = {
  create,
  getAllSeekers,
  findByUuid,
  remove,
  update,
  searchSeekers,
  getSeekerByUserId
};
