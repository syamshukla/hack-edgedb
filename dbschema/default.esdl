module default {
  type EdgePost {
    required title: str;
    required content: str {
      default := ""
    }
    multi ratings: Ratings;
  }
  type Ratings{
    required rating: decimal;
    required link post -> EdgePost;
  }
}