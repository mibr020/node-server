module.exports = [
    {
        name: "List profiles service",
        configs: {
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
                ]
            },
        },
        expected:
            [
                {
                    "currency": "AUD",
                    "id": "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                    "name": "Campaign Profile",
                    "parentId": null,
                    "totalInCents": 0,
                },
                {
                    "currency": "AUD",
                    "id": "2ad19172-9683-407d-9732-8397d58ddcb2",
                    "name": "Nick's Fundraising Profile",
                    "parentId": "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                    "totalInCents": 0,
                },
            ]
    }

];