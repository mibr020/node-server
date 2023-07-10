module.exports = [
    {
        name: "Should not create donation when donor name is not provided",
        endpoint: "/twirp/raisely.v1.ProfileService/CreateProfileDonation",
        configs: {
            request: { "donation": {} }
        },
        expected: {
            status: 400,
            body: {
                "code": "invalid_argument",
                "msg": "Donor name is invalid",
            }
        }
    },
    {
        name: "Should not create donation when profile id is not provided",
        endpoint: "/twirp/raisely.v1.ProfileService/CreateProfileDonation",
        configs: {
            request: { "donation": { "donorName": "tester" } }
        },
        expected: {
            status: 400,
            body: {
                "code": "invalid_argument",
                "msg": "Profile id is invalid",
            }
        }
    },
    {
        name: "Should not create donation with invlaid currency",
        endpoint: "/twirp/raisely.v1.ProfileService/CreateProfileDonation",
        configs: {
            request: { "donation": { "donorName": "tester", "profileId": "34234", "currency": "GBP", "amountInCents": 200 } }
        },
        expected: {
            status: 400,
            body: {
                "code": "invalid_argument",
                "msg": "Currency not supported",
            }
        }
    },
    {
        name: "Should not create donation with amount of 0",
        endpoint: "/twirp/raisely.v1.ProfileService/CreateProfileDonation",
        configs: {
            request: { "donation": { "donorName": "tester", "profileId": "4324", "currency": "AUD", "amountInCents": 0 } }
        },
        expected: {
            status: 400,
            body: {
                "code": "invalid_argument",
                "msg": "Amount has to bea number higher than 0",
            }
        }
    },
    {
        name: "Should not create donation with amount less than 0",
        endpoint: "/twirp/raisely.v1.ProfileService/CreateProfileDonation",
        configs: {
            request: { "donation": { "donorName": "tester", "profileId": "78afca18-8162-4ed5-9a7b-212b98c9ec87", "currency": "AUD", "amountInCents": -500 } }
        },
        expected: {
            status: 400,
            body: {
                "code": "invalid_argument",
                "msg": "Amount has to bea number higher than 0",
            }
        }
    },
    {
        name: "Should not create donation when profile is not found",
        endpoint: "/twirp/raisely.v1.ProfileService/CreateProfileDonation",
        configs: {
            request: { "donation": { "donorName": "tester", "profileId": "invalid", "currency": "AUD", "amountInCents": 500 } }
        },
        expected: {
            status: 404,
            body: {
                "code": "not_found",
                "msg": "Profile not found",
            }
        }
    },
    {
        name: "Should create dontation for profile with no parent",
        endpoint: "/twirp/raisely.v1.ProfileService/CreateProfileDonation",
        configs: {
            request: { "donation": { "donorName": "tester", "profileId": "78afca18-8162-4ed5-9a7b-212b98c9ec87", "currency": "AUD", "amountInCents": 500 } }
        },
        expected: {
            status: 200,
            body: {},
            listBody: {
                "profiles": [
                    {
                        "currency": "AUD",
                        "id": "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        "name": "Campaign Profile",
                        "totalInCents": 5500,
                    },
                    {
                        "currency": "AUD",
                        "id": "2ad19172-9683-407d-9732-8397d58ddcb2",
                        "name": "Nick's Fundraising Profile",
                        "parentId": "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        "totalInCents": 5000,
                    },
                ]
            }
        }
    },
    {
        name: "Should create dontation for profile with one parent",
        endpoint: "/twirp/raisely.v1.ProfileService/CreateProfileDonation",
        configs: {
            request: { "donation": { "donorName": "tester", "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2", "currency": "AUD", "amountInCents": 500 } }
        },
        expected: {
            status: 200,
            body: {},
            listBody: {
                "profiles": [
                    {
                        "currency": "AUD",
                        "id": "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        "name": "Campaign Profile",
                        "totalInCents": 6000,
                    },
                    {
                        "currency": "AUD",
                        "id": "2ad19172-9683-407d-9732-8397d58ddcb2",
                        "name": "Nick's Fundraising Profile",
                        "parentId": "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        "totalInCents": 5500,
                    },
                ]
            }
        }
    },
    {
        name: "Should not create campaign dontation for non campaign profile",
        endpoint: "/twirp/raisely.v1.ProfileService/CreateCampaignDonation",
        configs: {
            request: { "donation": { "donorName": "tester", "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2", "currency": "AUD", "amountInCents": 500 } }
        },
        expected: {
            status: 400,
            body: {
                "code": "invalid_argument",
                "msg": "Profile is not a campaign profile",
            },
        }
    },
    {
        name: "Should create campaign dontation for campaign profile",
        endpoint: "/twirp/raisely.v1.ProfileService/CreateCampaignDonation",
        configs: {
            request: { "donation": { "donorName": "tester", "profileId": "78afca18-8162-4ed5-9a7b-212b98c9ec87", "currency": "AUD", "amountInCents": 500 } }
        },
        expected: {
            status: 200,
            body: {},
            listBody: {
                "profiles": [
                    {
                        "currency": "AUD",
                        "id": "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        "name": "Campaign Profile",
                        "totalInCents": 6500,
                    },
                    {
                        "currency": "AUD",
                        "id": "2ad19172-9683-407d-9732-8397d58ddcb2",
                        "name": "Nick's Fundraising Profile",
                        "parentId": "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        "totalInCents": 5500,
                    },
                ]
            }
        }
    },
];