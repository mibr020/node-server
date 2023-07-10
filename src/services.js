import { database, Profile, Donation } from './model.js'
import { TwirpError } from "twirpscript";
import { exchangeRateConversion } from './util.js'
import { Currency } from "./protos/profile.pb.js";

export const listProfileDonations = (req, db = database) => {
    const { profileId } = req
    if (profileId == "" || typeof profileId !== 'string') {
        throw new TwirpError({
            code: "invalid_argument",
            msg: "Profile id is invalid",
        });
    }
    const profileDonations = Donation.batchGetByProfileId(db, profileId)
    if (profileDonations.length < 1) {
        throw new TwirpError({
            code: "not_found",
            msg: "Donations for the provided profile id do not exist",
        });
    }
    return profileDonations
}

export const listProfiles = (db = database) => {
    return Profile.listAll(db)
}

export const createProfileDonation = (req, db = database, isCampaignDonation = false) => {
    validate(req)
    const { profileId, currency, amountInCents } = req.donation
    const profile = Profile.getById(db, profileId)
    if (!profile || profile === undefined) {
        throw new TwirpError({
            code: "not_found",
            msg: "Profile not found",
        });
    }
    if (isCampaignDonation && profile.parentId) {
        throw new TwirpError({
            code: "invalid_argument",
            msg: "Profile is not a campaign profile",
        });
    }
    const profileCurrency = profile.currency
    procesUpdate(db, profile, amountInCents, exchangeRateConversion[currency][profileCurrency], currency)
    Donation.createDonation(db, req.donation.donorName, amountInCents, req.donation.currency, req.donation.profileId)
    return
}

export const procesUpdate = (db, profile, donationAmount, exchangeRate, donationCurrency) => {
    if (profile.parentId) {
        const parentProfile = Profile.getById(db, profile.parentId);
        if (!parentProfile || parentProfile === undefined) {
            throw new TwirpError({
                code: "not_found",
                msg: "Profile not found",
            });
        }
        const parentCurrency = parentProfile.currency
        procesUpdate(db, parentProfile, donationAmount, exchangeRateConversion[donationCurrency][parentCurrency], donationCurrency)
    }
    Profile.update(profile, donationAmount * exchangeRate)
}

const validate = (req) => {
    const { donorName, profileId, currency, amountInCents } = req.donation
    if (typeof donorName !== 'string' || !donorName) {
        throw new TwirpError({
            code: "invalid_argument",
            msg: "Donor name is invalid",
        });
    }
    if (typeof profileId !== 'string' || !profileId) {
        throw new TwirpError({
            code: "invalid_argument",
            msg: "Profile id is invalid",
        });
    }
    if (!Currency[currency] || currency == "UNSPECIFIED") {
        throw new TwirpError({
            code: "invalid_argument",
            msg: "Currency not supported",
        });
    }
    if (!Number.isInteger(amountInCents) || amountInCents <= 0) {
        throw new TwirpError({
            code: "invalid_argument",
            msg: "Amount has to bea number higher than 0",
        });
    }
}