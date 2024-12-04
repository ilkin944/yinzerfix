import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IRoleEnum, IUser, IUserStatus } from '../types';

const UserSchema: Schema<IUser> = new Schema({
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: '' },
    avatar: { type: String, default: 'https://static.vecteezy.com/system/resources/previews/009/592/988/original/3d-rendering-blue-and-yellow-color-user-icon-isolated-free-png.png' },
    role: { type: String, enum: IRoleEnum, default: IRoleEnum.CUSTOMER },
    address: [{ type: Object, default: {} }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    passwordHash: { type: String, default: "" },
    accessToken: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
    status: { type: String, enum: IUserStatus, default: IUserStatus.ACTIVE },
    isVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    lastLoginTime: { type: Date, default: new Date() },
    lastLoginIp: { type: String, default: "" },
    loginFailCount: { type: Number, default: 0 },
}, { timestamps: true });

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.passwordHash);
};

const User = model<IUser>('User', UserSchema);
export default User;