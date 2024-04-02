import {getLoginCredentials} from "./logic/functions.js"

const submit = document.getElementById(`loginSubmission`)
submit.addEventListener(`click`,() =>{
  console.log(`you have submitted:`, getLoginCredentials())
})