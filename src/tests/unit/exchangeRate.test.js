import { tests } from '../test'
import { getTestState } from '../state'
import { exchangeRateConversion } from '../../util.js'

tests('./fixtures/exchangeRates', () => {
    const { configs, expected } = getTestState();
    const rate = exchangeRateConversion[configs.from][configs.to]
    expect(rate).toEqual(expected);
});