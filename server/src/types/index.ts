import { Document, Schema, Types } from "mongoose";

export enum IRoleEnum {
    ADMIN = 'admin',
    MANAGER = 'manager',
    CUSTOMER = 'customer',
    TRANSLATOR = 'translator',
    HR = 'hr',
    SALES_MANAGER = 'sales-manager',
    PROJECT_MANAGER = 'project-manager',
    SUPPORT_MANAGER = 'support-manager',
    TAX_MANAGER = 'tax-manager'
}
export enum IUserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BLOCKED = 'blocked',
    DELETED = 'deleted',
    SUSPENDED = 'suspended'
}

export enum IStatus {
    ACCEPTED = 'accepted',
    COMPLETED = 'completed',
    REJECTED = 'rejected',
    PENDING = 'pending',
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
    BLOCKED = 'blocked',
    DEACTIVE = 'deactive',
    DELETED = 'deleted',
    PENDING_VERIFICATION = 'pending_verification',
    VERIFIED = 'verified',
    UNVERIFIED = 'unverified',
}

export interface IAddress {
    id: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}
export interface IAuthLogger extends Document {
    userId: Types.ObjectId;
    ip: string;
    actionType: IUserLoggerEnum;
    actionDate: Date;
    actionDetails: string;
}

export enum IUserLoggerEnum {
    LOGIN = 'login',
    SIGNUP = 'signup',
    FORGOT_PASSWORD = 'forgot_password',
    RESET_PASSWORD = 'reset_password'
}


export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
    passwordHash: string;
    role: IRoleEnum;
    status: IUserStatus;
    address: IAddress[];
    createdAt: Date;
    updatedAt: Date;
    provider: string;
    providerId: string;
    accessToken: string;
    refreshToken: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    lastLoginTime: Date;
    lastLoginIp: string;
    loginFailCount: number;
    isVerified: boolean;
}

export interface ILanguage extends Document {
    [x: string]: any;
    id: string;
    name: string;
    code: string;
    flag: string;
    status: IStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface ILanguageCreate {
    name: string;
    code: string;
    flag: string;
    status: IStatus;
}

export interface ILanguagePrice extends Document {
    languageFrom: Schema.Types.ObjectId;
    languageTo: Schema.Types.ObjectId;
    pricePerWord: number;
    pricePerPage: number;
    status: IStatus;
    createdAt: Date;
    updatedAt: Date;
}


export interface ILanguagePriceResponse {
    id?: string;
    _id: string;
    languageFrom: ILanguage;
    languageTo: ILanguage;
    pricePerWord: number;
    pricePerPage: number;
    status: IStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface ILanguageCreatePrice {
    languageFrom: string;
    languageTo: string;
    pricePerWord: number;
    pricePerPage: number;
    status: IStatus;
}

export interface ITranslator {
    _id: string;
    id: string;
    uid: Schema.Types.ObjectId;
    languages: ILanguage[];
    role: IRoleEnum.TRANSLATOR;
    experienceYears: number;
    qualifications: string[];
    bio: string;
    status: IStatus;
    verificationStatus: IStatus;
    verifyDetail: string;
    pendingProjects: IOrder[] | [];
    completedProjects: IOrder[] | [];
    rejectedProjects: IOrder[] | [];
    education: IEducation[] | [];
    workExperience: IWorkExperience[] | [];
    certifications: ICertification[] | [];
    createdAt: Date;
    updatedAt: Date;
}

export interface IEducation {
    id: string;
    school: string;
    degree: string;
    majority: string;
    startDate: Date;
    endDate: Date;
    grade: string;
    activities: string;
    description: string;
    skills: string[];
    file: string;
}

export interface IWorkExperience {
    id: string;
    title: string;
    employmentType: string;
    company: string;
    position: string;
    startDate: Date;
    endDate: Date;
    currentlyWorkingHere: boolean;
    description: string;
    skills: string[];
    file: string;
}
export interface ICertification {
    id: string;
    title: string;
    institution: string;
    issuedDate: Date;
    file: string;
}

export interface IService extends Document {
    name: string;
    services: ISubService[];
    status: IStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface IServiceCreate {
    name: string;
    status: IStatus;
}

export interface ISubService extends Document {
    name: string;
    service: Schema.Types.ObjectId;
    status: IStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISubServiceResponse{
    id: string;
    _id: string;
    name: string;
    service: IService;
    status: IStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrder extends Document {
    customer: Schema.Types.ObjectId
    translator: Schema.Types.ObjectId,
    fileUrl: string,
    wordCount: number,
    price: number,
    languageFrom: string,
    languageTo: string,
    status: IStatus,
    deadline: Date,
    createdAt: Date;
    updatedAt: Date;
}


export interface IPayment extends Document {
    order: Schema.Types.ObjectId,
    amount: number,
    transactionId: string,
    status: IStatus,
    createdAt: Date;
    updatedAt: Date;
}

export interface IBasket extends Document {
    userId: Types.ObjectId;            // Reference to User model
    items: Array<{
        productId: Types.ObjectId;     // Reference to Product model
        quantity: number;              // Quantity of the product
        price: number;                 // Price at the time of adding to basket
    }>;
    totalPrice: number;                 // Calculated total price of the basket
    status: 'active' | 'pending' | 'completed' | 'cancelled'; // Status of the basket
    createdAt: Date;
    updatedAt: Date;
}

export interface IAddress{
    id: string;
    name: string;
    country: string;
    city: string;
    state: string;
    zip: string;
    address1: string;
    address2: string;
    email: string[];
    type:string;
    latitude: string,
    longitude: string,
    phone: string[],
}

export interface ICompany extends Document{
    name: string;
    logo: string;
    favico: string;
    description: string;
    address: IAddress[];
    phone: string[];
    email: string;
    socials:{
        name:string;
        url:string;
    }[];
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    metaImage: string;
    metaCanonical: string;
    metaGoogleSiteVerification: string;
    metaGoogleAnalytics: string;
    metaGoogleTagManager: string;
    metaFacebookAppId: string;
    metaFacebookAppSecret: string;
    metaTwitterCard: string;
    metaTwitterSite: string;
    metaTwitterCreator: string;
    metaTwitterDescription: string;
    metaTwitterTitle: string;
    metaTwitterImage: string;
    metaTwitterImageAlt: string;
    metaOgTitle: string;
    metaOgDescription: string;
    metaOgImage: string;
    metaOgImageAlt: string;
    metaOgImageWidth: string;
    metaOgImageHeight: string;
    metaOgUrl: string;
    metaOgType: string;
    metaOgSiteName: string;
    metaOgLocale: string;
    metaOgLocaleAlternate: string;
    metaOgEmail: string;
}