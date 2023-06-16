CREATE TABLE auth.users (
  id uuid PRIMARY KEY,
  email varchar NOT NULL
);

CREATE TABLE projects (
  id uuid PRIMARY KEY,
  name varchar NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  impact_score float NOT NULL
);

CREATE TABLE project.resources_usage (
  id uuid PRIMARY KEY,
  project_id uuid REFERENCES projects(id) NOT NULL,
  date date NOT NULL,
  water_usage float NOT NULL,
  energy_usage float NOT NULL
);

CREATE TABLE project.p5_society_impact (
  id uuid PRIMARY KEY,
  project_id uuid REFERENCES projects(id) NOT NULL
  date date NOT NULL,
  description text,
  score_before integer,
  solution text,
  score_after integer,
);

CREATE TABLE project.p5_environment_impact (
  id uuid PRIMARY KEY,
  project_id uuid REFERENCES projects(id) NOT NULL
  date date NOT NULL,
  description text,
  score_before integer,
  solution text,
  score_after integer,
);

CREATE TABLE project.p5_financial_impact (
  id uuid PRIMARY KEY,
  project_id uuid REFERENCES projects(id) NOT NULL
  date date NOT NULL,
  description text,
  score_before integer,
  solution text,
  score_after integer,
);