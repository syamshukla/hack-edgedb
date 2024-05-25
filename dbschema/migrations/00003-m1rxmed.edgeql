CREATE MIGRATION m1rxmedb7sh34i7fgaqrqusovv2absool7yd4mcl5didgmrmwwgjqq
    ONTO m1z2ada5uwzmm5sijkzwsm5iyygze7waumuu2qmxtrahwqassk7jzq
{
  ALTER TYPE default::Rating {
      ALTER PROPERTY rating {
          SET default := 0;
      };
  };
};
