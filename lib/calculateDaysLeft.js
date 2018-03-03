import { getLifeData } from './getCountryList'

function calculateDaysLeft(country, gender, dob){
  const lifeData = getLifeData(country)
  var lifeSpan = Math.floor(lifeData[gender] * 365)
  var daysLived = findDaysLived(dob)
  var daysLeft = lifeSpan - daysLived
  console.log("daysLeft", daysLeft)
  return daysLeft
}

function findDaysLived(dob){
  var dobArr = dob.split("-")
  var dobHash = {
      year: dobArr[0],
      month: dobArr[1],
      day: dobArr[2]
  }
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var monthIndex = Number(dobHash.month)-1
  var birthDate = new Date(dobHash.year, monthIndex, dobHash.day);
  var currentDate = new Date()
  var daysLived = Math.round(Math.abs((birthDate.getTime() - currentDate.getTime())/(oneDay)));
  return daysLived
}

export { calculateDaysLeft }    