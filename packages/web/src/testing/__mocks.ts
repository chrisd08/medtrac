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

export { createAuthMock };
