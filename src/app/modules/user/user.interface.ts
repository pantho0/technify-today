export interface IUser {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  role?: "admin" | "user";
  profileImage?: string;
  isPremium?: boolean;
  isBlocked?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
