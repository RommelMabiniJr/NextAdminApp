const PROVINCE = "Leyte";

// Capitalize each word in a string
const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const buildAddressString = (street, brgy, city) => {
  // Concatenate the address string
  let addressString = "";

  if (street) {
    addressString += `${capitalizeWords(street)}`;
  }

  if (brgy) {
    if (addressString) {
      addressString += `, ${capitalizeWords(brgy)}`;
    } else {
      addressString += `${capitalizeWords(brgy)}`;
    }
  }

  if (city) {
    if (addressString) {
      addressString += `, ${capitalizeWords(city)}`;
    } else {
      addressString += `${capitalizeWords(city)}`;
    }
  }

  if (addressString) {
    addressString += `, ${PROVINCE}`;
  } else {
    addressString += `${PROVINCE}`;
  }

  return addressString;
};
