const  generateUniqueCode=() =>{
    const prefix = 'FA';
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(3, 9);
    const uniqueCode = `${prefix}${timestamp}`;
    return uniqueCode;
  }
  module.exports = {
    generateUniqueCode
  }

  