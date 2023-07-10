import { setTestState } from "./state"

export const tests = (fixture, callback = async () => { }) => {
    const fixtures = require(fixture)

    fixtures.map(item => {

        beforeEach(() => {
            const pattern = item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const regex = new RegExp(`.*${pattern}$`)
            if (regex.test(expect.getState().currentTestName)) {
                setTestState({ configs: item.configs, expected: item.expected, endpoint: item.endpoint })
            }


        })

        it(item.name, callback)

        afterAll(() => {
            setTestState({})
        })
    });
}