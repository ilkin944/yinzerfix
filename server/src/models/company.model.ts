import { Schema, model } from 'mongoose';
import { IAddress, ICompany } from '../types';

const AddressSchema = new Schema<IAddress>({
    id: { type: String,  default: '' },
    name: { type: String,  default: '' },
    country: { type: String,  default: '' },
    city: { type: String,  default: '' },
    state: { type: String,  default: '' },
    zip: { type: String,  default: '' },
    address1: { type: String,  default: '' },
    address2: { type: String,  default: '' },
    email: [{ type: String,  default: '' }],
    type: { type: String,  default: '' },
    latitude: { type: String,  default: '' },
    longitude: { type: String,  default: '' },
    phone: [{ type: String,  default: '' }],

}, { _id: false });
const CompanySchema: Schema<ICompany> = new Schema({
    name: { type: String,  default: '' },
    logo: { type: String,  default: '' },
    favico: { type: String,  default: '' },
    description: { type: String,  default: '' },
    address: [AddressSchema],
    phone: [{ type: String,  default: '' }],
    email: { type: String,  default: '' },
    socials: [{
        name: { type: String,  default: '' },
        url: { type: String,  default: '' },
    }],
    metaTitle: { type: String,  default: '' },
    metaDescription: { type: String,  default: '' },
    metaKeywords: { type: String,  default: '' },
    metaImage: { type: String,  default: '' },
    metaCanonical: { type: String,  default: '' },
    metaGoogleSiteVerification: { type: String,  default: '' },
    metaGoogleAnalytics: { type: String,  default: '' },
    metaGoogleTagManager: { type: String,  default: '' },
    metaFacebookAppId: { type: String,  default: '' },
    metaFacebookAppSecret: { type: String,  default: '' },
    metaTwitterCard: { type: String,  default: '' },
    metaTwitterSite: { type: String,  default: '' },
    metaTwitterCreator: { type: String,  default: '' },
    metaTwitterDescription: { type: String,  default: '' },
    metaTwitterTitle: { type: String,  default: '' },
    metaTwitterImage: { type: String,  default: '' },
    metaTwitterImageAlt: { type: String,  default: '' },
    metaOgTitle: { type: String,  default: '' },
    metaOgDescription: { type: String,  default: '' },
    metaOgImage: { type: String,  default: '' },
    metaOgImageAlt: { type: String,  default: '' },
    metaOgImageWidth: { type: String,  default: '' },
    metaOgImageHeight: { type: String,  default: '' },
    metaOgUrl: { type: String,  default: '' },
    metaOgType: { type: String,  default: '' },
    metaOgSiteName: { type: String,  default: '' },
    metaOgLocale: { type: String,  default: '' },
    metaOgLocaleAlternate: { type: String,  default: '' },
    metaOgEmail: { type: String,  default: '' }
}, { timestamps: true });


const Company = model<ICompany>('Company', CompanySchema);
export default Company;
