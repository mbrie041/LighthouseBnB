const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});
pool
  .connect()
  .then(() => {
    console.log("connected to lightbnb");
  })
  .catch(() => {
    console.error("connection failed");
  });
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(
      `
      SELECT * FROM users
      WHERE email = $1`,
      [email.toLowerCase()]
    )

    .then((res) => {
      console.log(res.rows);
      let user = res.rows[0] || null;
      return user;
    });
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(
      `
      SELECT * FROM users
      WHERE users.id = $1`,
      [id]
    )

    .then((res) => {
      let user = res.rows[0] || null;
      return user;
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
    .query(
      `
      INSERT INTO users (name, email, password)
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [user.name, user.email, user.password]
    )

    .then((res) => {
      return res.rows[0];
    });

  //   const userId = Object.keys(users).length + 1;
  //   user.id = userId;
  //   users[userId] = user;
  //   return Promise.resolve(user);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(
      `SELECT properties.*, reservations.*, avg(rating) as average_rating
      FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      JOIN property_reviews ON properties.id = property_reviews.property_id 
      WHERE reservations.guest_id = $1
      AND reservations.end_date < now()::date
      GROUP BY properties.id, reservations.id
      ORDER BY reservations.start_date
      LIMIT $2;`,
      [guest_id, limit]
    )
    .then((res) => res.rows)
    .catch((err) => console.error(err));
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE TRUE
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += ` AND city LIKE $${queryParams.length}`; //1
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += ` AND owner.id = $${queryParams.length}`; //2
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`); //3
    queryString += ` AND cost_per_night >= $${queryParams.length}`;
    queryParams.push(`${options.maximum_price_per_night * 100}`); //4
    queryString += ` AND cost_per_night <= $${queryParams.length}`;
  }

  queryString += " GROUP BY properties.id";

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`); //5
    queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  }
  queryString += " ORDER BY cost_per_night";

  queryParams.push(limit);
  queryString += ` limit $${queryParams.length}`;

  console.log("queryString>>>", queryString);
  console.log("queryParams>>>", queryParams);

  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  return pool
    .query(
      `
      INSERT INTO properties (
        title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
      `,
      [
        property.title,
        property.description,
        property.owner_id,
        property.cover_photo_url,
        property.thumbnail_photo_url,
        property.cost_per_night,
        property.parking_spaces,
        property.number_of_bathrooms,
        property.number_of_bedrooms,
        property.active,
        property.province,
        property.city,
        property.country,
        property.street,
        property.post_code,
      ]
    )

    .then((res) => {
      return res.rows[0];
    });
};
exports.addProperty = addProperty;
