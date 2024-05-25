module default {
  type EdgePost {
    required title: str;
    required content: str {
      default := ""
    }
  }
}