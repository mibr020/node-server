module.exports = [
    {
        name: "Should fail - invalid profile id",
        endpoint: '/twirp/raisely.v1.ProfileService/ListProfileDonations',
        configs: {
            request: {
                profileId: 5
            },
            dbTest: {},
        },
        expected: {
            err: true
        }
    },
    {
        name: "Should fail - empty set of donations",
        endpoint: '/twirp/raisely.v1.ProfileService/ListProfileDonations',
        configs: {
            request: {
                profileId: "sdsad"
            },
            dbTest: {},
        },
        expected: {
            err: true
        }
    },
    {
        name: "Should return four donations for profile",
        configs: {
            request: {
                profileId: "2ad19172-9683-407d-9732-8397d58ddcb2"
            },
            dbTest: {
                profiles: [
                    {
                        id: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        name: "Campaign Profile",
                        totalInCents: 0,
                        parentId: null,
                        currency: "AUD"
                    },
                    {
                        id: "2ad19172-9683-407d-9732-8397d58ddcb2",
                        name: "Nick's Fundraising Profile",
                        totalInCents: 0,
                        parentId: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        currency: "AUD"
                    }
                ],
                donations: [
                    {
                        "amountInCents": 5000,
                        "currency": "AUD",
                        "donorName": "Jane Smith",
                        "id": "one-3016-4a29-bffd-913f41b98598",
                        "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2",
                    },
                    {
                        "amountInCents": 5000,
                        "currency": "AUD",
                        "donorName": "Jane Smith",
                        "id": "two-3016-4a29-bffd-913f41b98598",
                        "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2",
                    },
                    {
                        "amountInCents": 5000,
                        "currency": "AUD",
                        "donorName": "Jane Smith",
                        "id": "three-3016-4a29-bffd-913f41b98598",
                        "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2",
                    },
                    {
                        "amountInCents": 5000,
                        "currency": "AUD",
                        "donorName": "Jane Smith",
                        "id": "four-3016-4a29-bffd-913f41b98598",
                        "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2",
                    },
                    {
                        "amountInCents": 5000,
                        "currency": "AUD",
                        "donorName": "Jane Smith",
                        "id": "f7939023-3016-4a29-bffd-913f41b98598",
                        "profileId": "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                    },
                ]
            },
        },
        expected: [
            {
                "amountInCents": 5000,
                "currency": "AUD",
                "donorName": "Jane Smith",
                "id": "one-3016-4a29-bffd-913f41b98598",
                "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2",
            },
            {
                "amountInCents": 5000,
                "currency": "AUD",
                "donorName": "Jane Smith",
                "id": "two-3016-4a29-bffd-913f41b98598",
                "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2",
            },
            {
                "amountInCents": 5000,
                "currency": "AUD",
                "donorName": "Jane Smith",
                "id": "three-3016-4a29-bffd-913f41b98598",
                "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2",
            },
            {
                "amountInCents": 5000,
                "currency": "AUD",
                "donorName": "Jane Smith",
                "id": "four-3016-4a29-bffd-913f41b98598",
                "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2",
            },
        ]
    },
];