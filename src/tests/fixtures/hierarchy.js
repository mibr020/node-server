const { TwirpError } = require("twirpscript");

module.exports = [
    {
        name: "Update profile total of campaign profile",
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
            profileIndex: 0,
            donationAmount: 500,
            exchangeRate: 1,
            donationCurrency: "AUD",
        },
        expected: {
            dbTest: {
                profiles: [
                    {
                        id: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        name: "Campaign Profile",
                        totalInCents: 500,
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
        }
    },
    {
        name: "Update profile total of team and campaign profile",
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
            profileIndex: 1,
            donationAmount: 500,
            exchangeRate: 1,
            donationCurrency: "AUD",
        },
        expected: {
            dbTest: {
                profiles: [
                    {
                        id: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        name: "Campaign Profile",
                        totalInCents: 500,
                        parentId: null,
                        currency: "AUD"
                    },
                    {
                        id: "2ad19172-9683-407d-9732-8397d58ddcb2",
                        name: "Nick's Fundraising Profile",
                        totalInCents: 500,
                        parentId: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        currency: "AUD"
                    }
                ]
            },
        }
    },
    {
        name: "Update profile total of one child profile, team profile, and campaign profile",
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
                        name: "Nick's Fundraising Team Profile",
                        totalInCents: 0,
                        parentId: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        currency: "AUD"
                    },
                    {
                        id: "3334ad9c-f586-4db8-af2c-ca5a897c9f5b",
                        name: "Jack's Fundraising Profile",
                        totalInCents: 0,
                        parentId: "2ad19172-9683-407d-9732-8397d58ddcb2",
                        currency: "AUD"
                    },
                    {
                        id: "0b481088-07dd-4ad6-a42b-8df5ed801c24",
                        name: "Jane's Fundraising Profile",
                        totalInCents: 0,
                        parentId: "2ad19172-9683-407d-9732-8397d58ddcb2",
                        currency: "AUD"
                    },
                    {
                        id: "bd2f1b35-f378-41a2-ae5f-136ea23ce7cf",
                        name: "John's Fundraising Profile",
                        totalInCents: 0,
                        parentId: "2ad19172-9683-407d-9732-8397d58ddcb2",
                        currency: "AUD"
                    }
                ]
            },
            profileIndex: 4,
            donationAmount: 500,
            exchangeRate: 1,
            donationCurrency: "AUD",
        },
        expected: {
            dbTest: {
                profiles: [
                    {
                        id: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        name: "Campaign Profile",
                        totalInCents: 500,
                        parentId: null,
                        currency: "AUD"
                    },
                    {
                        id: "2ad19172-9683-407d-9732-8397d58ddcb2",
                        name: "Nick's Fundraising Team Profile",
                        totalInCents: 500,
                        parentId: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
                        currency: "AUD"
                    },
                    {
                        id: "3334ad9c-f586-4db8-af2c-ca5a897c9f5b",
                        name: "Jack's Fundraising Profile",
                        totalInCents: 0,
                        parentId: "2ad19172-9683-407d-9732-8397d58ddcb2",
                        currency: "AUD"
                    },
                    {
                        id: "0b481088-07dd-4ad6-a42b-8df5ed801c24",
                        name: "Jane's Fundraising Profile",
                        totalInCents: 0,
                        parentId: "2ad19172-9683-407d-9732-8397d58ddcb2",
                        currency: "AUD"
                    },
                    {
                        id: "bd2f1b35-f378-41a2-ae5f-136ea23ce7cf",
                        name: "John's Fundraising Profile",
                        totalInCents: 500,
                        parentId: "2ad19172-9683-407d-9732-8397d58ddcb2",
                        currency: "AUD"
                    }
                ]
            },
        }
    },
    {
        name: "Fail to update because team profile has an invalid parent id",
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
                        name: "Nick's Fundraising Team Profile",
                        totalInCents: 0,
                        parentId: "invalid",
                        currency: "AUD"
                    },
                    {
                        id: "3334ad9c-f586-4db8-af2c-ca5a897c9f5b",
                        name: "Jack's Fundraising Profile",
                        totalInCents: 0,
                        parentId: "2ad19172-9683-407d-9732-8397d58ddcb2",
                        currency: "AUD"
                    },
                    {
                        id: "0b481088-07dd-4ad6-a42b-8df5ed801c24",
                        name: "Jane's Fundraising Profile",
                        totalInCents: 0,
                        parentId: "2ad19172-9683-407d-9732-8397d58ddcb2",
                        currency: "AUD"
                    },
                    {
                        id: "bd2f1b35-f378-41a2-ae5f-136ea23ce7cf",
                        name: "John's Fundraising Profile",
                        totalInCents: 0,
                        parentId: "2ad19172-9683-407d-9732-8397d58ddcb2",
                        currency: "AUD"
                    }
                ]
            },
            profileIndex: 4,
            donationAmount: 500,
            exchangeRate: 1,
            donationCurrency: "AUD",
        },
        expected: {
            err: '{ "code": "not_found", "meta": undefined, "msg": "Profile not found" }'
        }
    },
];