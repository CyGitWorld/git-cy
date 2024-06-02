### create local db

`yarn wrangler d1 execute dev-db --local --file=./sql/users.schema.sql`

### create remote db

`yarn wrangler d1 execute dev-db --remote --file=./sql/users.schema.sql`

### delete db

`yarn wrangler d1 delete dev-db --local`

### query db

`yarn wrangler d1 execute dev-db --local --command="SELECT * FROM Users"`

### show all db lists

`yarn wrangler d1 list`
