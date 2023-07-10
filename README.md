# Node Server

## Getting Started

### Running Locally

1. `npm install`
2. `npm start`

## Testing

`npm test`

### Tech Stack
- React
- NodeJS
- Protobuf + TwirpScript
- Webpack

### Endpoints

>/twirp/raisely.v1.ProfileService/ListProfiles

>/twirp/raisely.v1.ProfileService/ListProfileDonations

>/twirp/raisely.v1.ProfileService/CreateProfileDonation

>/twirp/raisely.v1.ProfileService/CreateCampaignDonation

### Curl example

``` 
curl -X POST 'http://localhost:8081/twirp/raisely.v1.ProfileService/ListProfileDonations' \
  -H 'content-type: application/json' \
  --data '{"profileId":"2ad19172-9683-407d-9732-8397d58ddcb2"}' \
  --compressed
  ```