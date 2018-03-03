function getDateList(startDate, endDate) {
  var dates = [],
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};


// Usage
// var bubbleDates = getDates(new Date(2018,0,10), new Date(2018,1,02));   


// bubbleDates.forEach(function(date) {
//   console.log(date.toString());
// });

export { getDateList }