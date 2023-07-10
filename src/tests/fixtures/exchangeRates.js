module.exports = [
    {
        name: "USD to USD",
        configs: {
            from: "USD",
            to: "USD",
        },
        expected: 1
    },
    {
        name: "USD to AUD",
        configs: {
            from: "USD",
            to: "AUD",
        },
        expected: 1.35
    },
    {
        name: "USD to EUR",
        configs: {
            from: "USD",
            to: "EUR",
        },
        expected: 0.85
    },
    {
        name: "AUD to USD",
        configs: {
            from: "AUD",
            to: "USD",
        },
        expected: 0.74
    },
    {
        name: "AUD to AUD",
        configs: {
            from: "AUD",
            to: "AUD",
        },
        expected: 1
    },
    {
        name: "AUD to EUR",
        configs: {
            from: "AUD",
            to: "EUR",
        },
        expected: 0.63
    },
    {
        name: "EUR to USD",
        configs: {
            from: "EUR",
            to: "USD",
        },
        expected: 1.18
    },
    {
        name: "EUR to AUD",
        configs: {
            from: "EUR",
            to: "AUD",
        },
        expected: 1.59
    },
    {
        name: "EUR to EUR",
        configs: {
            from: "EUR",
            to: "EUR",
        },
        expected: 1
    },
];