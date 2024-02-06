export interface Posts {
  id: string;
  caption: string;
  image: string;
  mode: "PUBLIC" | "PRIVATE";
  time: string;
  userId: string;
}
