import auth0 from "auth0-js";
import { config } from "../config";

export interface UserInterface {
  name: string;
  email: string;
  picture: string;
}

export interface AuthInterface {
  isAuthenticated: boolean;
  idToken?: string;
  accessToken?: string;
  user?: UserInterface;
  login(): void;
  logout(): void;
  authorise(): Promise<void>;
  silentAuth(): Promise<boolean>;
}

export class Auth implements AuthInterface {
  private authFlag = "isLoggedIn";
  private auth0: auth0.WebAuth;
  public idToken?: string;
  public accessToken?: string;
  public user?: UserInterface;
  public expiresAt?: number;

  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: config.AUTH0_DOMAIN,
      clientID: config.AUTH0_CLIENTID,
      redirectUri: `${config.CLIENT_URL}/callback`,
      audience: config.AUTH0_AUDIENCE,
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
      returnTo: config.CLIENT_URL,
      clientID: config.AUTH0_CLIENTID,
    });
  };

  setSession = (authResult: auth0.Auth0DecodedHash): void => {
    this.idToken = authResult.idToken;
    this.user = authResult.idTokenPayload;
    this.accessToken = authResult.accessToken;
    if (authResult.expiresIn) {
      this.expiresAt = new Date().getTime() + authResult.expiresIn * 1000;
    }
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  };

  authorise = (): Promise<void> => {
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

  silentAuth = (): Promise<boolean> => {
    if (this.isAuthenticated) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            localStorage.removeItem(this.authFlag);
            return reject(err);
          }
          this.setSession(authResult);
          resolve(true);
        });
      });
    }
    return Promise.resolve(false);
  };
}
