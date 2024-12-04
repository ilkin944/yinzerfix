import { Schema, model } from 'mongoose';
import { ICertification, IEducation, IRoleEnum, IStatus, ITranslator, IWorkExperience } from '../types';

const EducationSchema = new Schema<IEducation>({
    school: { type: String, required: true },
    degree: { type: String, required: true },
    majority: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    grade: { type: String },
    activities: { type: String },
    description: { type: String },
    skills: [{ type: String }],
    file: { type: String }
}, { _id: false });
const WorkExperienceSchema = new Schema<IWorkExperience>({
    title: { type: String, required: true },
    employmentType: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    currentlyWorkingHere: { type: Boolean, default: false },
    description: { type: String },
    skills: [{ type: String }],
    file: { type: String }
}, { _id: false });

const CertificationSchema = new Schema<ICertification>({
    title: { type: String, required: true },
    institution: { type: String, required: true },
    issuedDate: { type: Date, required: true },
    file: { type: String }
}, { _id: false });

const TranslatorSchema = new Schema<ITranslator>({
    uid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    languages: [{ type: Schema.Types.ObjectId, ref: 'Language', required: true }],
    role: { type: String, enum: IRoleEnum, default: IRoleEnum.TRANSLATOR },
    experienceYears: { type: Number, default: 0 },
    qualifications: [{ type: String },],
    bio: { type: String },
    status: { type: String, enum: IStatus, default: IStatus.PENDING },
    verificationStatus: { type: String, enum: IStatus, default: IStatus.PENDING_VERIFICATION },
    verifyDetail: { type: String, default: '' },
    pendingProjects: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    completedProjects: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    rejectedProjects: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    education: [EducationSchema],
    workExperience: [WorkExperienceSchema],
    certifications: [CertificationSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

TranslatorSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Translator = model<ITranslator>('Translator', TranslatorSchema);
export default Translator;
