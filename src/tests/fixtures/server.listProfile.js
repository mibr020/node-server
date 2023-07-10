module.exports = [
    {
        name: "List profiles",
        endpoint: '/twirp/raisely.v1.ProfileService/ListProfiles',
        configs: {
        },
        expected: {
            status: 200,
            body: {
                "profiles": [
                    {
                        "currency": "AUD",
                        "id": "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        "name": "Campaign Profile",
                        "totalInCents": 5000,
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
];