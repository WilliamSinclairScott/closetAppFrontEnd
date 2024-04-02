import {
  getLoginCredentials,
  goToLoginScreen,
  goToClosetChoiceScreen,
  closetScreen,
} from "./logic/functions.js"

const submit = document.getElementById(`loginSubmission`)
submit.addEventListener(`click`,() =>{
  //TODO: AUTH LOGIC NEEDED instead of log
  console.log(`you have submitted:`, getLoginCredentials())
  //! Skipping to next page
  goToClosetChoiceScreen()
})  