const regex = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phoneNumber: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/, //Indian Mobile number, accepts with or without +91
  userName: /^[A-Za-z ]+$/,
};

export { regex };
