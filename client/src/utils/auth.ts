import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Return the user profile from the saved token
  getProfile() {    
    if (this.loggedIn()) {
      return jwtDecode(this.getToken());
    }
  }

  // Return true if the user is logged in
  loggedIn() {    
    const token = this.getToken();

    if (token?.length > 0 && !this.isTokenExpired(token)) {      
      return true;
    }
    
    return false;
  }
  
  // Return true if the token is expired
  isTokenExpired(token: string) {    
    const decodedToken = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;    

    // If token has a valid expiration date that's not expired, return false
    return !(decodedToken?.exp && decodedToken.exp > currentTime);    
  }

  // Get the token from local storage
  getToken(): string {
    const token = localStorage.getItem('token');

    return token ?? '';    
  }

  // Save login token and redirect to homepage
  login(idToken: string) {
    // Save token in local storage
    localStorage.setItem('token', idToken);

    // Redirect to the home page
    window.location.assign('/');
  }

  // Remove token and redirect to login
  logout() {
    // Remove token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page
    window.location.assign('/loginpage');
  }
}

export default new AuthService();
