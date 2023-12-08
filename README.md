# web-admin


- NestJs Microservice
- RabbitMQ
- Postgres



## feature

- Various Role – Super Admin, Admin, Power User(s), Users, Support Desk
- Admin can create Power User(s) and Users

a. Once an Admin creates a user ID for a Power User(s), Users, they should receive an email with a one-
time password link. This link should expire once the user is prompted to change their password

b. Use Session-based Authentication
c. Use appropriate email services libraries/API

-There can be only one Super Admin. Super Admin can Create Group and assign Admin to Group
