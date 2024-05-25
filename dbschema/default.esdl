module default {
  type EdgePost {
    required title: str;
    required content: str {
      default := ""
    }
    multi ratings: Rating;
  }
  type Rating {
    required rating: decimal;
    required link post -> EdgePost;
  }
}