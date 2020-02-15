$ yarn add knex
$ yarn add knex sqlite3

\$ yarn add express bcryptjs knex-cleaner server express-session connect-session-knex helmet cors

\$ yarn knex init
-> edit knexfile.js && package.json
-> copy files over

$ yarn knex migrate:make users
$ yarn knex seed:make 000-cleanup
--> fix 'users' in migration, and '000-cleanup' in seeds
