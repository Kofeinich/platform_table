import Ajv from "ajv";

const ajv = new Ajv({allErrors: true});

export const validator = (reportSchema, reportData) => {
    const validate = ajv.compile(reportSchema);
    const isValid = validate(reportData);
    if (isValid) {
        return reportData;
    } else {
        console.error("Validate error")
        return null
    }
};