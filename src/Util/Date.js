const getDate = (timestamp) => {
    if (isNaN(timestamp)) {
      console.error('Invalid timestamp:', timestamp);
      return 'Invalid Date';
    }
  
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', date);
      return 'Invalid Date';
    }
  
    return date.toISOString().slice(0, 10);
  };
  
  export default getDate;
  