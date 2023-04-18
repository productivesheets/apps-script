/**
 * Code Developed by Manideep Chaudhary from https://productivesheets.com
 * @productivesheets
 */ 
function switchNames(names, delimiter = ",") {
  names = typeof names === "string" ? [[names]] : names;

  return names.map((getinside) => getinside.map((fullName) => {
      const nameArr = fullName.trim().split(' ');
      return `${nameArr.slice(1).join(" ")}${delimiter} ${nameArr.shift()}`;
  }));

}
