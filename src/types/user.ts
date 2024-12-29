type UserData = {
  id: string;
  name: string;
  description: string;
  github_id: string;
  qiita_id: string;
  x_id: string;
  user_skill: {
    skills: {
      id: number;
      name: string;
    };
  }[];
};

export class User {
  public githubUrl: string;
  public qiitaUrl: string;
  public xUrl: string;

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public github_id: string,
    public qiita_id: string,
    public x_id: string,
    public user_skill: {
      skills: {
        id: number;
        name: string;
      };
    }[]
  ) {
    this.githubUrl = github_id ? `https://github.com/${github_id}` : "";
    this.qiitaUrl = qiita_id ? `https://qiita.com/${qiita_id}` : "";
    this.xUrl = x_id ? `https://x.com/${x_id}` : "";
  }

  static createUser(data: UserData): User {
    return new User(
      data.id,
      data.name,
      data.description,
      data.github_id,
      data.qiita_id,
      data.x_id,
      data.user_skill
    );
  }
}
