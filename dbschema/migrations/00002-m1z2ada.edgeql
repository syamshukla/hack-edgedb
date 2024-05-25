CREATE MIGRATION m1z2ada5uwzmm5sijkzwsm5iyygze7waumuu2qmxtrahwqassk7jzq
    ONTO m1jbkm4y44e6nhehi3rzza5kfylv3ymj4iy6vx6fftwae3pj5523fq
{
  ALTER TYPE default::BlogPost RENAME TO default::EdgePost;
  CREATE TYPE default::Rating {
      CREATE REQUIRED LINK post: default::EdgePost;
      CREATE REQUIRED PROPERTY rating: std::decimal;
  };
  ALTER TYPE default::EdgePost {
      CREATE MULTI LINK ratings: default::Rating;
  };
};
