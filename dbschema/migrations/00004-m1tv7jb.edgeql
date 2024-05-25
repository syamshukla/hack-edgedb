CREATE MIGRATION m1tv7jbizx7zb36kqekafihlfa7r67jgad5abo34b7ofds77af52qq
    ONTO m1rxmedb7sh34i7fgaqrqusovv2absool7yd4mcl5didgmrmwwgjqq
{
  ALTER TYPE default::Rating RENAME TO default::Ratings;
  ALTER TYPE default::Ratings {
      ALTER PROPERTY rating {
          RESET default;
      };
  };
};
