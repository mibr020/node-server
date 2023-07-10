module.exports = [
    {
        name: "Should fail - invalid profile id",
        endpoint: '/twirp/raisely.v1.ProfileService/ListProfileDonations',
        configs: {
            request: {
                profileId: 5
            }
        },
        expected: {
            status: 400,
            body: {
                "code": "invalid_argument",
                "msg": "Profile id is invalid",
            },
        }
    },
    {
        name: "Should fail - empty set of donations",
        endpoint: '/twirp/raisely.v1.ProfileService/ListProfileDonations',
        configs: {
            request: {
                profileId: "not-found"
            }
        },
        expected: {
            status: 404,
            body: {
                "code": "not_found",
                "msg": "Donations for the provided profile id do not exist",
            },
        }
    },
    {
        name: "Should return one donation for profile",
        endpoint: '/twirp/raisely.v1.ProfileService/ListProfileDonations',
        configs: {
            request: {
                profileId: "2ad19172-9683-407d-9732-8397d58ddcb2"
            }
        },
        expected: {
            status: 200,
            body: {
                "donations": [
                    {
                        "amountInCents": 5000,
                        "currency": "AUD",
                        "donorName": "Jane Smith",
                        "id": "f7939023-3016-4a29-bffd-913f41b98598",
                        "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2",
                    },
                ],
            },
        }
    },
];