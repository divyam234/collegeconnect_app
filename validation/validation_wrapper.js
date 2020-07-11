import validation from './validation'
const validatejs=require("validate.js");
export default function validate(fieldName, value) {
  var formValues = {}
  formValues[fieldName] = value
  var formFields = {}
  formFields[fieldName] = validation[fieldName]
  const result = validatejs(formValues, formFields)
  if (result) {
    return result[fieldName][0]
  }

  return null
}
export function validatePassword(pvalue,cpvalue) {
  if(pvalue!==cpvalue){
    return 'password didn\'t match'
  }
  return null
}