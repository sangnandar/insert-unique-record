# Insert Only Unique Record

# Overview
This is Cloud Functions script to insert only unique records into BigQuery. This use case is very useful when working with digital marketing campaign.

The script inserts only unique `date`+`email`+`utm_source`+`utm_medium`+`utm_campaign`.

# BigQuery configuration
<div align="center"><img src="https://github.com/user-attachments/assets/ba9a0bd1-0b74-42ac-9aeb-2520a1c6ecd4" /></div>
<div align="center">Table structure</div>

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
`GET` /insertRecord?email=john.smith<span>@</span>email.com&utm_source=google&utm_medium=cpc&utm_campaign=brand

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

# See also
- [insert-unique-record2](https://github.com/sangnandar/insert-unique-record2) same use case but using Apps Script instead of Cloud Functions.
