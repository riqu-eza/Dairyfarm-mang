export const generateFarmCode = (farmName) => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
    const year = date.getFullYear();
  
    const farmCode = `${farmName.substring(0, 2).toUpperCase()}-${day}${month}-${year}${farmName.substring(2, 4).toUpperCase()}`;
    return farmCode;
  };
   