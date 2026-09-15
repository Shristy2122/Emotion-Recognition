export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
}

const USERS_STORAGE_KEY = 'emotia_registered_users_v1';
const CURRENT_USER_KEY = 'emotia_current_session_v1';
const OTP_STORE_KEY = 'emotia_temp_otps_v1';

// Pre-seeded default user
const DEFAULT_USER: UserAccount = {
  id: 'usr_default_shristy',
  name: 'Shristy',
  email: 'shristy@emotia.ai',
  phone: '+91 9876543210',
  password: 'password123',
  createdAt: new Date().toISOString(),
};

export const authService = {
  // Retrieve all registered users
  getRegisteredUsers(): UserAccount[] {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    // Initialize default seed
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([DEFAULT_USER]));
    return [DEFAULT_USER];
  },

  // Save new user
  registerUser(details: { name: string; email: string; phone: string; password: string }): UserAccount {
    const users = this.getRegisteredUsers();
    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      name: details.name.trim(),
      email: details.email.trim().toLowerCase(),
      phone: details.phone.trim(),
      password: details.password,
      createdAt: new Date().toISOString(),
    };

    const updated = [...users.filter((u) => u.email !== newUser.email), newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
    this.setCurrentUser(newUser);
    return newUser;
  },

  // Check if user exists by email
  findUserByEmail(email: string): UserAccount | undefined {
    const users = this.getRegisteredUsers();
    return users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  },

  // Validate sign in
  loginUser(email: string, password: string): { success: boolean; message: string; user?: UserAccount } {
    const user = this.findUserByEmail(email);
    if (!user) {
      return { success: false, message: 'No account found with this email. Please sign up.' };
    }
    if (user.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again or reset your password.' };
    }
    this.setCurrentUser(user);
    return { success: true, message: 'Login successful!', user };
  },

  // Current logged in user session
  getCurrentUser(): UserAccount | null {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    // Default to Shristy if not explicitly logged out
    return DEFAULT_USER;
  },

  setCurrentUser(user: UserAccount | null): void {
    if (!user) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  },

  logoutUser(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Generate simulated 6-digit OTP
  generateOtp(identifier: string): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      const otps = JSON.parse(localStorage.getItem(OTP_STORE_KEY) || '{}');
      otps[identifier.trim().toLowerCase()] = {
        code: otp,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
      };
      localStorage.setItem(OTP_STORE_KEY, JSON.stringify(otps));
    } catch {
      // ignore
    }
    return otp;
  },

  // Verify OTP
  verifyOtp(identifier: string, enteredOtp: string): boolean {
    try {
      const otps = JSON.parse(localStorage.getItem(OTP_STORE_KEY) || '{}');
      const record = otps[identifier.trim().toLowerCase()];
      if (!record) return false;
      if (Date.now() > record.expiresAt) return false;
      return record.code.trim() === enteredOtp.trim();
    } catch {
      return false;
    }
  },

  // Reset password
  resetPassword(email: string, newPassword: string): { success: boolean; message: string } {
    const users = this.getRegisteredUsers();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (userIndex === -1) {
      return { success: false, message: 'No registered user found with this email address.' };
    }

    users[userIndex].password = newPassword;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    // Update current session if matching
    const current = this.getCurrentUser();
    if (current && current.email.toLowerCase() === email.toLowerCase()) {
      current.password = newPassword;
      this.setCurrentUser(current);
    }

    return { success: true, message: 'Password updated successfully! You can now log in.' };
  },
};
