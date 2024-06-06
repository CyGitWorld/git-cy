import { Minihome } from "../router/api/minihome/minihome.schema";
import { User } from "./../router/api/user/user.schema";
export type DataBase = {
  Users: User;
  Minihomes: Minihome;
};
