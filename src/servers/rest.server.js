// import { listProfileDonations, listProfiles, createProfileDonation } from '../services.js'
// import express from "express"

// const app = express();
// const port = 8080;

// /**
//  * Fetch all profiles
//  */
// app.get("/profiles", (req, res) => {
//   const out = listProfiles()
//   res.json(out);
// });

// /**
//  * Fetch a single profiles donations
//  */
// app.get("/profiles/:profileId/donations", (req, res) => {
//   console.log(req.params)
//   const out = listProfileDonations(req.params)
//   res.json(out);
// });

// /**
//  * Submit a new donation to the profile with the given ID
//  */
// app.post("/profiles/:profileId/donations", (req, res) => {
//   const { profileId } = req.params
//   createProfileDonation(req.body)
//   res.status(200);
// });

// /**
//  * Submit a new donation to the campaign
//  */
// app.post("/donations", (req, res) => {
//   createProfileDonation(req.body, undefined, true)
//   res.status(200);
// });

// if (process.env.NODE_ENV !== "TEST") {
//   app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
//   });
// }
