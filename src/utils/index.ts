const regex = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  // phoneNumber: /^[6-9]\d{9}$/,
  phoneNumber: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/, //Indian Mobile number, accepts with or without +91
  // phoneNumber:
  //   /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/,
  pinCodeIndia: /^[1-9][0-9]{5}$/, // Indian Pincode
  pinCodeInternational: /^.*$/,
  fullName: /^[A-Za-z ]+$/,
};

export { regex };
