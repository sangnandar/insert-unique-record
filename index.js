const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery({ projectId: 'serbaguna' });

const functions = require('@google-cloud/functions-framework');

/**
 * Works with both GET and POST requests.
 *
 * @param {Object} req 
 * @param {Object} res 
 * 
 * @example
 * GET /inserRecord?email=john.smith@email.com&utm_source=google&utm_medium=cpc&utm_campaign=brand
 * POST /insertRecord
 * {
 *  "email": "john.smith@email.com",
 *  "utm_source": "google",
 *  "utm_medium": "cpc",
 *  "utm_campaign": "brand"
 * }
 */
functions.http('insertRecord', async (req, res) => {

  // auth validation
  if (req.headers['api-key'] !== process.env.API_KEY) {
    res.status(403).json({ status: 403, message: 'Forbidden.' });
    return;
  }

  /**
   * To run campaigns on specific country, it's a good idea to 
   * offset the timestamp to the timezone of the country.
   */
  const utcTimestamp = new Date().toISOString();

  const table = process.env.TABLE;
  const query = `
    insert into ${table} (
      ts,
      date,
      email,
      utm_source,
      utm_medium,
      utm_campaign
    ) values (
      @ts,
      date(@ts),
      @email,
      @utm_source,
      @utm_medium,
      @utm_campaign
    )`;

  const options = {
    query: query,
    params: {
      ts: utcTimestamp,
      email: req.body.email || req.query.email || '',
      utm_source: req.body.utm_source || req.query.utm_source || '',
      utm_medium: req.body.utm_medium || req.query.utm_medium || '',
      utm_campaign: req.body.utm_campaign || req.query.utm_campaign || ''
    }
  };

  try {
    await bigquery.query(options);
    res.status(200).json({ status: 200, message: 'Data inserted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: `Error inserting BigQuery: ${err}` });
  }
});