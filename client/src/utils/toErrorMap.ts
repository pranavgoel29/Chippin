export const getFieldMap = (errors: any) => {
  const fieldMap: Record<string, string> = {};
  errors.forEach(({ field }) => {
    if (typeof field === "string") {
      const path = field.split(".")[0];
      fieldMap[path] = field;
    }
  });
  return Object.values(fieldMap);
};

export const getMessageMap = (errors: any) => {
  const messageMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    if (typeof field === "string") {
      const path = field.split(".")[0];
      messageMap[path] = message;
    }
  });
  return Object.values(messageMap);
};
