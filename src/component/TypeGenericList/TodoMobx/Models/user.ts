import { computed } from "mobx";
import IUser from "../../../../appInterface/IUser";
import AppStore from "../stores/AppStore";

export default class User implements IUser {
  id: number;
  name: string;
  username: string;
  email: string;

  constructor(private store: AppStore, user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
  }
  @computed getPosts() {
    return this.store.post.all.filter((item) => item.id === this.id);
  }
}
