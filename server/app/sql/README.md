### create local db

`yarn wrangler d1 execute dev-db --local --file=./sql/schema.sql`

### create remote db

`yarn wrangler d1 execute dev-db --remote --file=./sql/schema.sql`

### delete all columns

`yarn wrangler d1 execute dev-db --local --command="DELETE FROM Users"`

### delete db

`yarn wrangler d1 delete dev-db --local`

### query db

`yarn wrangler d1 execute dev-db --local --command="SELECT * FROM Users"`

### show all db lists

`yarn wrangler d1 list`
