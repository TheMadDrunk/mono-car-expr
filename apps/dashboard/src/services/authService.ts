import { UserManager, WebStorageStateStore, User } from 'oidc-client-ts';

// --- Configuration ---
// Replace with your Authentik details
const authentikDomain = 'localhost:80'; // e.g., 'auth.yourcompany.com' or 'localhost:9000' if self-hosting
const authentikClientId = 'jAXZHO3MK0nartxSvbu0f0GHSxKqbfMxshM5AV0u'; // The Client ID of your Authentik Application

export const oidcConfig = {
    authority: `http://${authentikDomain}/application/o/dashboard/`, // Standard Authentik OIDC discovery endpoint
    client_id: authentikClientId,
    redirect_uri: window.location.origin + '/callback', // Where Authentik redirects after login
    post_logout_redirect_uri: window.location.origin + '/login', // Where Authentik redirects after logout
    response_type: 'code', // Use 'code' for Authorization Code Flow with PKCE
    scope: 'openid profile email', // Request basic user info and email
    automaticSilentRenew: true, // Attempt to renew tokens automatically
    loadUserInfo: true, // Load user claims from the userinfo endpoint
    // Optional: storage for user session (defaults to sessionStorage)
    userStore: new WebStorageStateStore({ store: window.localStorage }), // Use localStorage for persistence across tabs/reloads
};

const userManager = new UserManager(oidcConfig);

// --- Public AuthService Interface ---
class AuthService {
    private userManager: UserManager;

    constructor(userManagerInstance: UserManager) {
        this.userManager = userManagerInstance;

        // Optional: Event listeners for better debugging and UI updates
        this.userManager.events.addUserLoaded((user) => {
            console.log('User loaded:', user);
        });
        this.userManager.events.addUserUnloaded(() => {
            console.log('User unloaded (logged out or session expired)');
        });
        this.userManager.events.addAccessTokenExpired(() => {
            console.log('Access token expired. Automatic renewal attempt...');
            // Optionally, force a refresh or show a message if silent renew fails
        });
        this.userManager.events.addSilentRenewError((error) => {
            console.error('Silent renew error:', error);
            // Handle cases where silent renew fails (e.g., user is offline, session expired on IdP)
        });
    }

    // Initiates the login process (redirects to Authentik)
    public login(): Promise<void> {
        return this.userManager.signinRedirect();
    }

    // Handles the callback from Authentik after login
    public async completeLogin(): Promise<User | null> {
        try {
            const user = await this.userManager.signinRedirectCallback();
            console.log('Login successful:', user);
            return user;
        } catch (error) {
            console.error('Error completing login:', error);
            // Handle login errors, e.g., show an error message to the user
            throw error; // Re-throw to allow component to handle
        }
    }

    // Initiates the logout process (redirects to Authentik)
    public logout(): Promise<any> {
        // This will redirect to Authentik for session termination, then back to post_logout_redirect_uri
        return this.userManager.signoutRedirect();
    }

    // Gets the current user session (if any)
    public async getUser(): Promise<User | null> {
        return this.userManager.getUser();
    }

    // Gets the access token for API calls
    public async getAccessToken(): Promise<string | undefined> {
        const user = await this.userManager.getUser();
        if (user && !user.expired) {
            return user.access_token;
        }
        return undefined;
    }

    // Removes the user session locally
    public async clearUser(): Promise<void> {
        return this.userManager.clearStaleState(); // Clears any pending signin request state
    }
}

export const authService = new AuthService(userManager); 