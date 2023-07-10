import React, { useState } from "react";
import { render } from "react-dom";
import { ListProfiles, CreateProfileDonation, CreateCampaignDonation, ListProfileDonations } from "../protos/profile.pb";
import { client } from "twirpscript";

client.baseURL = `http://localhost:${REACT_APP_PORT}`;

function formatProfile(profile) {
  return `${profile.id} ${profile.name}, ${profile.totalInCents}, ${profile.parentId}, ${profile.currency}`;
}

function formatDonation(d) {
  return `${d.id} ${d.donorName}, ${d.amountInCents}, ${d.profileId}, ${d.currency}`;
}

const App = () => {
  const [profileDonation, setProfileDonation] = useState({});
  const [campaignDonation, setCampaignDonation] = useState({});
  const [campaignDonationCurrencySelected, setCampaignDonationCurrencySelected] = useState("");
  const [profileDonationCurrencySelected, setProfileDonationCurrencySelected] = useState("");
  const [profileId, setProfileId] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [donations, setDonations] = useState([]);
  const [status, setStatus] = useState(undefined);
  const options = [
    { value: "", label: "Select a currency"},
    { value: "USD", label: "USD"},
    { value: "EUR", label: "EUR"},
    { value: "AUD", label: "AUD"},
  ]

  const changeCurrency = (newCurrency, setCurrencyFunc) => {
    setCurrencyFunc(newCurrency)
  }

  async function listProfiles() {
    await ListProfiles()
    .then(res => {
      setStatus({color: "green", msg: "retrieved all profiles!"})
      setProfiles(res.profiles)
    }).catch(err => setStatus({color: "red", msg:`${err.code}: ${err.msg}` } ))
  }

  async function listProfileDonations() {
      await ListProfileDonations(profileId)
      .then(res =>{
        setDonations(res.donations)
        setStatus({color: "green", msg: "retrieved profile donations!"})
      })
      .catch(err => {
        setStatus({color: "red", msg:`${err.code}: ${err.msg}` })
      })
  }

  async function createProfileDonation() {
    if (profileDonation) {
      await CreateProfileDonation({donation: profileDonation})
      .then(res => {
        setStatus({color: "green", msg: "profile donation created!"})
      })
      .catch(err => {
        setStatus({color: "red", msg:`${err.code}: ${err.msg}` })
      })
    }
  }

  async function createCampaignDonation() {
    if (campaignDonation) {
      await CreateCampaignDonation({donation:campaignDonation})
      .then(res => {
        setStatus({color: "green", msg: "profile donation created!"})
      })
      .catch(err => {
        setStatus({color: "red", msg:`${err.code}: ${err.msg}` })
      })
    }
  }

  return (
    <div>
      <h1>Raisely </h1>
      <h3>Profiles: </h3>
      <ul>
        {profiles.map((profile) => (
          <li>{formatProfile(profile)}</li>
        ))}
      </ul>
      <button type="button" onClick={() => {listProfiles()}}>
          List Profiles
      </button>
      <h3>Donations: </h3>
      <ul>
        {donations.map((d) => (
          <li>{formatDonation(d)}</li>
        ))}
      </ul>
      <form onSubmit={(e) => {
        listProfileDonations();
        e.preventDefault();
      }}>
        <input
          type="string"
          onChange={(e) => setProfileId({ profileId: e.target.value })}
        />
        <button type="submit">
          Batch Get Profile Donations
      </button>
      </form>
      <h3>Create Profile Donation </h3>
      <form
        onSubmit={(e) => {
          createProfileDonation();
          e.preventDefault();
        }}
      >
        <input
          type="string"
          placeholder="donor name"
          onChange={(e) => {
            let updatedValue = {donorName:e.target.value}
            setProfileDonation(profileDonation => ({
              ...profileDonation,
              ...updatedValue
            }))
          }}
        />
        <input
          type="number"
          placeholder="amount in cents"
          onChange={(e) => {
            let updatedValue = {amountInCents:parseInt(e.target.value)}
            setProfileDonation(profileDonation => ({
              ...profileDonation,
              ...updatedValue
            }))
          }}
        />
        <input
          type="string"
          placeholder="profile id"
          onChange={(e) => {
            let updatedValue = {profileId:e.target.value}
            setProfileDonation(profileDonation => ({
              ...profileDonation,
              ...updatedValue
            }))
          }}
        />
        <select value={profileDonationCurrencySelected} onChange={(e) => {
          const updatedValue = {currency:e.target.value}
          changeCurrency(e.target.value, setProfileDonationCurrencySelected)
          setProfileDonation(profileDonation => ({
            ...profileDonation,
            ...updatedValue
          }))
        }}>
          {options.map((op) => (
            <option key={op.value} value={op.value}>{op.label}</option>
          ))}
        </select>
        <button type="submit">
          Create Profile Donation!
        </button>
      </form>
      <h3>Create Campaign Donation </h3>
      <form
        onSubmit={(e) => {
          createCampaignDonation();
          e.preventDefault();
        }}
      >
        <input
          type="string"
          placeholder="donor name"
          onChange={(e) => {
            let updatedValue = {donorName:e.target.value}
            setCampaignDonation(donation => ({
              ...donation,
              ...updatedValue
            }))
          }}
        />
        <input
          type="number"
          placeholder="amount in cents"
          onChange={(e) => {
            let updatedValue = {amountInCents:parseInt(e.target.value)}
            setCampaignDonation(campaignDonation => ({
              ...campaignDonation,
              ...updatedValue
            }))
          }}
        />
        <input
          type="string"
          placeholder="profile id"
          onChange={(e) => {
            let updatedValue = {profileId:e.target.value}
            setCampaignDonation(campaignDonation => ({
              ...campaignDonation,
              ...updatedValue
            }))
          }}
        />
        <select value={campaignDonationCurrencySelected} onChange={(e) => {
          const updatedValue = {currency:e.target.value}
          changeCurrency(e.target.value, setCampaignDonationCurrencySelected)
          setCampaignDonation(campaignDonation => ({
            ...campaignDonation,
            ...updatedValue
          }))
        }}>
          {options.map((op, idx) => 
            <option key={idx} value={op.value}>{op.label}</option>
          )}
        </select>
        <button type="submit">
          Create Campaign Donation!
        </button>
      </form>
      {status && <p style={{ color: status.color }}>{status.msg}</p>}
    </div>
  );
};

render(<App />, document.getElementById("app"));
