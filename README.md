# Insert Only Unique Record

# Overview
This is Cloud Functions script to insert only unique records into BigQuery. This use case is very useful when working with digital marketing campaign.

The script inserts only unique `date`+`email`+`utm_source`+`utm_medium`+`utm_campaign`.

# BigQuery configuration
Table structure

[image]

# Cloud Functions configuration
- Runtime: Node.js
- Entry point: `insertRecord`
- Environment variables:
  - `API_KEY` - generate your own random string to be used as API_KEY.
  - `TABLE` - BigQuery tablename.

# Usage
One of the advantages of using Cloud Functions is that we can add API key authentication into request headers.
```
'headers': {
  'API-Key': '...',
  'Content-Type': 'application/json'
}
```
`GET` /insertRecord?email=john.smith@email.com&utm_source=google&utm_medium=cpc&utm_campaign=brand

`POST` /insertRecord

Payload
```
{
 "email": "john.smith@email.com",
 "utm_source": "google",
 "utm_medium": "cpc",
 "utm_campaign": "brand"
}
```
