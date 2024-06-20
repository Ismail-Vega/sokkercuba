/* eslint-disable @typescript-eslint/no-explicit-any */
import ajv from "../services/jsonValidator";

export const validateUpdateData = (rawData: any, type: string) => {
  const validate = ajv.getSchema(type);

  if (validate) {
    try {
      const parsedData = JSON.parse(rawData);
      const valid = validate(parsedData);
      console.log("valid: ", valid);

      if (!valid) {
        console.log("validation errors: ", validate.errors);
        return null;
      }

      return parsedData;
    } catch {
      return null;
    }
  } else return null;
};
