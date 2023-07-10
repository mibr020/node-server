import { tests } from './test'
import { getTestState } from './state'
import supertest from "supertest"
import { twirpServer } from "../servers/twirp.server"
const request = supertest(twirpServer, { http2: true });

const makeRequest = async (url, method, body = {}) => {
    const req = request[method](url);
    req
        .set("Accept", "application/json")
        .set("content-type", "application/json");
    return await req.send(body);
};

const expectResponse = (res, status, expected) => {
    expect(res.status).toEqual(status);
    expect(res.type).toEqual(expect.stringContaining("application/json"));
    expect(JSON.parse(res.text)).toEqual(expected);
};

tests('./fixtures/server.listProfile', async () => {
    const { endpoint, configs, expected } = getTestState();
    const res = await makeRequest(endpoint, "post", configs)
    expectResponse(res, expected.status, expected.body)
});

tests('./fixtures/server.listProfileDonations', async () => {
    const { endpoint, configs, expected } = getTestState();
    const res = await makeRequest(endpoint, "post", configs.request)
    expectResponse(res, expected.status, expected.body)
});

tests('./fixtures/server.createDonation', async () => {
    const { endpoint, configs, expected } = getTestState();
    const res = await makeRequest(endpoint, "post", configs.request)
    expectResponse(res, expected.status, expected.body)

    if (expected.status == 200) {
        const res2 = await makeRequest("/twirp/raisely.v1.ProfileService/ListProfiles", "post")
        expectResponse(res2, expected.status, expected.listBody)
    }
});