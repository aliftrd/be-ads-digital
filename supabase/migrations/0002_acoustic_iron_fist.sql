CREATE TABLE IF NOT EXISTS "product_assets" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"image" varchar NOT NULL
);
