CREATE TABLE weekend_to_do_app (
	id serial primary key,
	task varchar(120) not null,
	completed boolean
);

INSERT INTO "weekend_to_do_app" ("task", "completed") VALUES('Grab Mail');

SELECT * FROM weekend_to_do_app ORDER BY task



