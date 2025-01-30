import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {  
  try {
    // POST request to the login route
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    // If response bad, throw the error message
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    // Return successful response with token
    return await response.json();    
  } catch (error) {
    console.log('Error from user login: ', error);
    return Promise.reject('Failed to login');
  }
}

export { login };
