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
/**
 * Sets all sections visibility hidden and loginScreen visibility to visible
 */
export const goToLoginScreen = () => {
  const loginScreen = document.getElementById(`loginScreen`)
  const closetChoiceScreen =  document.getElementById(`closetChoiceScreen`)
  const closetScreen =  document.getElementById(`closetScreen`)

  loginScreen.style.visibility = `visible`
  closetChoiceScreen.style.visibility = `hidden`
  closetScreen.style.visibility = `hidden`
}

/**
 * Sets all sections visibility hidden and closetChoiceScreen visibility to visible
 */
export const goToClosetChoiceScreen = () => {
  const loginScreen = document.getElementById(`loginScreen`)
  const closetChoiceScreen =  document.getElementById(`closetChoiceScreen`)
  const closetScreen =  document.getElementById(`closetScreen`)

  loginScreen.style.visibility = `hidden`
  closetChoiceScreen.style.visibility = `visible`
  closetScreen.style.visibility = `hidden`
}

/**
 * Sets all sections visibility hidden and closetScreen visibility to visible
 */
export const closetScreen = () => {
  const loginScreen = document.getElementById(`loginScreen`)
  const closetChoiceScreen =  document.getElementById(`closetChoiceScreen`)
  const closetScreen =  document.getElementById(`closetScreen`)

  loginScreen.style.visibility = `hidden`
  closetChoiceScreen.style.visibility = `hidden`
  closetScreen.style.visibility = `visible`
}