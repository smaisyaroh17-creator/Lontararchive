const AUTH_KEY = "lontararchive_login";
const EMAIL_KEY = "lontararchive_email";

export function loginDummy(email: string, password: string) {
  const dummyEmail = "smaisyaroh17@gmail.com";
  const dummyPassword = "sitimaisyaroh17";

  if (email !== dummyEmail || password !== dummyPassword) {
    return false;
  }

  localStorage.setItem(AUTH_KEY, "true");
  localStorage.setItem(EMAIL_KEY, email);

  return true;
}

export function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function getLoggedInEmail() {
  return localStorage.getItem(EMAIL_KEY);
}

export function logoutDummy() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(EMAIL_KEY);
}