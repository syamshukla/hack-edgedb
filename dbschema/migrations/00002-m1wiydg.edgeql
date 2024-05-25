CREATE MIGRATION m1wiydg277bvrpzwgyl5cn5dcppl2zennvvy2shfd6c45o6jvnmtka
    ONTO m1jbkm4y44e6nhehi3rzza5kfylv3ymj4iy6vx6fftwae3pj5523fq
{
  ALTER TYPE default::BlogPost RENAME TO default::EdgePost;
};
