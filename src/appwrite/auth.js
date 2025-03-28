import conff from '../conff/conff.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conff.appwriteUrl)
            .setProject(conff.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Login after successful account creation
                try {
                    return await this.login({email, password});
                } catch (loginError) {
                    // Account created but login failed
                    console.error("Login after signup failed:", loginError);
                    return userAccount; // Return account anyway
                }
            }
            return userAccount;
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        }
    }

    async login({email, password}) {
        try {
            // Correct method name here:
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;