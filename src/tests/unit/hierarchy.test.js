import { tests } from '../test'
import { getTestState } from '../state'
import { procesUpdate } from '../../services'

tests('./fixtures/hierarchy', () => {
    const { configs, expected } = getTestState();
    let dbTest = configs.dbTest
    if (expected.err) {
        expect(() => { procesUpdate(dbTest, dbTest.profiles[configs.profileIndex], configs.donationAmount, configs.exchangeRate, configs.donationCurrency) }).toThrowErrorMatchingSnapshot(expected.err)
    } else {
        procesUpdate(dbTest, dbTest.profiles[configs.profileIndex], configs.donationAmount, configs.exchangeRate, configs.donationCurrency)
        expect(dbTest).toEqual(expected.dbTest);
    }
});