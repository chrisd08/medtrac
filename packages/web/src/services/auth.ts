import auth0 from "auth0-js";
import config from "../config/auth_config.json";

export interface UserInterface {
  name: string;
  email: string;
  picture: string;
}

export interface AuthInterface {
  isAuthenticated: boolean;
  idToken?: string;
  accessToken?: string;
  idTokenPayload?: UserInterface;
  login(): void;
  logout(): void;
  handleAuthentication(): Promise<void>;
  silentAuth(): Promise<void> | undefined;
}

export class Auth implements AuthInterface {
  private authFlag = "isLoggedIn";
  private auth0: auth0.WebAuth;
  public idToken?: string;
  public accessToken?: string;
  public idTokenPayload?: UserInterface;
  public expiresAt?: number;

  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: config.domain,
      clientID: config.clientId,
      redirectUri: "http://localhost:3000/callback",
      audience: config.audience,
      responseType: "token id_token",
      scope: "openid profile email",
    });
  }

  get isAuthenticated(): boolean {
    const authFlag = localStorage.getItem(this.authFlag);
    return authFlag ? JSON.parse(authFlag) : false;
  }

  login = (): void => {
    this.auth0.authorize();
  };

  logout = (): void => {
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.auth0.logout({
      returnTo: "http://localhost:3000",
      clientID: config.clientId,
    });
  };

  setSession = (authResult: auth0.Auth0DecodedHash): void => {
    this.idToken = authResult.idToken;
    this.idTokenPayload = authResult.idTokenPayload;
    this.accessToken = authResult.accessToken;
    if (authResult.expiresIn) {
      this.expiresAt = new Date().getTime() + authResult.expiresIn * 1000;
    }
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  };

  handleAuthentication = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  };

  silentAuth = (): Promise<void> | undefined => {
    if (this.isAuthenticated) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            localStorage.removeItem(this.authFlag);
            return reject(err);
          }
          this.setSession(authResult);
          resolve();
        });
      });
    }
  };
}
