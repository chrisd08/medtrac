import { match } from "css-mediaquery";
import { AuthInterface } from "../services/auth";

const createAuthMock = (
  silentAuthResult = true
): jest.Mocked<AuthInterface> => ({
  isAuthenticated: false,
  login: jest.fn(),
  logout: jest.fn(),
  authorise: jest.fn(),
  silentAuth: jest.fn(() => Promise.resolve(silentAuthResult)),
  user: {
    name: "test user",
    email: "test",
    picture: "test",
  },
});

const createMatchMedia = (
  width: number
): ((query: string) => MediaQueryList) => {
  return jest.fn().mockImplementation(query => ({
    matches: match(query, { width }),
    addListener: () => null,
    removeListener: () => null,
  }));
};

export { createAuthMock, createMatchMedia };
