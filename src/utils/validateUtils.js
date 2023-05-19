/* 
  * Export a function that takes a string groupName and checks
  * that it follows the following rules:
  *  1. Must be between 3 and 20 characters long
  *  2. Must not contain any special characters (e.g. !@#$%^&*()_+)
  * throws an error of the rule it violates if it does not follow
*/
export const validateGroupName = (groupName) => {
  if (groupName.length < 3 || groupName.length > 20) {
    throw new Error('Group name must be between 3 and 20 characters long');
  }
  if (!/^[a-zA-Z0-9 ]+$/.test(groupName)) {
    throw new Error('Group name must not contain any special characters');
  }
}