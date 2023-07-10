import { createProfileService } from "../protos/profile.pb.js";
import { listProfileDonations, listProfiles, createProfileDonation } from '../services.js'
import { createTwirpServer } from "twirpscript";

export const profileServices = {
    ListProfileDonations: (req) => {
        const out = listProfileDonations(req)
        return {
            donations: out
        }
    },
    ListProfiles: () => {
        const out = listProfiles()
        return {
            profiles: out
        };
    },
    CreateProfileDonation: (req) => {
        createProfileDonation(req)
        return {}
    },
    CreateCampaignDonation: (req) => {
        createProfileDonation(req, undefined, true)
        return {}
    },
}

const twirpProfileServer = createProfileService(profileServices)
export const twirpServer = createTwirpServer([twirpProfileServer]);