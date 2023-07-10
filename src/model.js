import { v4 as uuidv4 } from "uuid";
import { exchangeRateConversion } from "./util.js"


export let database = {
    profiles: [
        {
            id: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
            name: "Campaign Profile",
            totalInCents: 5000,
            parentId: null,
            currency: "AUD"
        },
        {
            id: "2ad19172-9683-407d-9732-8397d58ddcb2",
            name: "Nick's Fundraising Profile",
            totalInCents: 5000,
            parentId: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
            currency: "AUD"
        }
    ],
    donations: [{
        id: "f7939023-3016-4a29-bffd-913f41b98598",
        donorName: "Jane Smith",
        amountInCents: 5000,
        profileId: "2ad19172-9683-407d-9732-8397d58ddcb2",
        currency: "AUD"
    }]
}

export class Donation {
    constructor(id, donorName, amount, currency, profileId) {
        this.id = id;
        this.donorName = donorName;
        this.amount = amount;
        this.currency = currency;
        this.profileId = profileId;
    }

    static batchGetByProfileId(db, profileId) {
        const out = db.donations.filter((d) => {
            return d["profileId"] === profileId
        })
        return out
    }

    toJSON() {
        return {
            id: this.id,
            donorName: this.donorName,
            amount: this.amount,
            currency: this.currency,
            profileId: this.profileId
        };
    }

    static createDonation(db, donorName, amount, currency, profileId) {
        const newDonation = new Donation(uuidv4(), donorName, amount, currency, profileId);
        db.donations.push(newDonation.toJSON())
    }
}

export class Profile {
    constructor(id, name, total, parentId, currency) {
        this.id = id;
        this.name = name;
        this.total = total;
        this.parentId = parentId;
        this.currency = currency;
    }

    static listAll(db) {
        return db.profiles;
    }

    static getById(db, profileId) {
        return db.profiles.find(p => p["id"] == profileId)
    }

    static update(profile, donationAmount) {
        profile.totalInCents += donationAmount
    }

    static updateProfileTotal(db, profile, donationAmount, exchangeRate, donationCurrency) {
        profile.totalInCents += (donationAmount * exchangeRate);
        if (profile.parentId) {
            const parentProfile = this.getById(db, profile.parentId);
            if (!profile || profile === undefined) {
                throw new TwirpError({
                    code: "not_found",
                    msg: " id is empty",
                });
            }
            if (parentProfile) {
                const parentCurrency = parentProfile.currency
                updateProfileTotal(db, parentProfile, donationAmount, exchangeRateConversion[donationCurrency][parentCurrency], donationCurrency)
            }
        }
    }
}