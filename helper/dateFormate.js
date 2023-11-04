
  const formatDateToCustomFormat =  (dateString)=>{
    const formattedDate = dateString.substring(0, 4) + dateString.substring(5, 7) + dateString.substring(8, 10);
    return formattedDate;
  }
  
  module.exports = {
    formatDateToCustomFormat
  }