import { tests } from './test'
import { getTestState } from './state'
import { listProfileDonations, listProfiles, createProfileDonation } from '../services.js'

tests('./fixtures/service.listProfile', () => {
    const { configs, expected } = getTestState();
    const res = listProfiles(configs.dbTest)
    expect(res).toEqual(expected);
});

tests('./fixtures/service.listProfileDonations', () => {
    const { configs, expected } = getTestState();
    if (expected.err) {
        expect(() => { listProfileDonations(configs.request, configs.dbTest) }).toThrow()
    } else {
        const res = listProfileDonations(configs.request, configs.dbTest)
        expect(res).toEqual(expected);
    }
});