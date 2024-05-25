module default {
  type User {
    required property username -> str;
    multi link submitted_schemas -> Schema;
    multi link given_roasts -> Roast;
  }

  type Schema {
    required property text -> str;
    optional link submitter -> User;
    multi link roasts -> Roast;
  }

  type Roast {
    required property text -> str;
    required link schema -> Schema;
    required link reviewer -> User;
    required property votes -> int64 {
      default := 0;
    }
    multi link votes_detail -> Vote;
  }

  type Vote {
    required link roast -> Roast;
    required link voter -> User;
    required property vote_type -> str; # "upvote" or "downvote"
  }
}