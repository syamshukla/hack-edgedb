CREATE MIGRATION m12g3ra2md64x24nmzhl22ibzl2y4pjlf3viievqz65oszpsniuufq
    ONTO initial
{
  CREATE TYPE default::EdgePost {
      CREATE REQUIRED PROPERTY content: std::str {
          SET default := '';
      };
      CREATE REQUIRED PROPERTY title: std::str;
  };
  CREATE TYPE default::Ratings {
      CREATE REQUIRED LINK post: default::EdgePost;
      CREATE REQUIRED PROPERTY rating: std::decimal;
  };
  ALTER TYPE default::EdgePost {
      CREATE MULTI LINK ratings: default::Ratings;
  };
};
