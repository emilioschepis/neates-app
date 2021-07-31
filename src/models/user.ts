class User {
  id: string;
  email: string | null;
  isAnonymous: boolean;

  constructor(id: string, email: string | null, isAnonymous: boolean) {
    this.id = id;
    this.email = email;
    this.isAnonymous = isAnonymous;
  }
}

export default User;
