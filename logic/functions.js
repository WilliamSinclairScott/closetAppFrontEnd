/**
 * obtains the input fields in the loginScreen section
 * @returns an object containing the key's email and pass
 */
export const getLoginCredentials = () => {
  const userEmail = document.getElementById(`loginEmail`)
  const userPassword = document.getElementById(`loginPassword`)
  let emailVal = userEmail.value
  let passVal = userPassword.value
  userEmail.value = ``
  userPassword.value = ``
  return { 
    email : emailVal,
    pass : passVal
  }
}

