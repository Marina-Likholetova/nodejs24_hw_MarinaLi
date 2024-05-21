const yup = require("yup");

const userDataSchema = yup.object().shape({
    username: yup.string().trim().required("Username is required").min(1),
    email: yup.string().trim().email("Invalid email").required("Email is required"),
});

const userIdSchema = yup.object().shape({
    userId: yup
        .string()
        .trim()
        .required("UserId is required")
        .test("is-number", "UserId must be a positive integer", (value) => {
            const parsed = Number(value);
            return Number.isInteger(parsed) && parsed >= 0;
        }),
});

const userIdValidator = async (req, resp, next) => {
    try {
        await userIdSchema.validate(req.params);
    } catch (err) {
        resp.status(400).send({ error: err.message });
        return;
    }

    next();
};

const userDataValidator = async (req, resp, next) => {
    try {
        await userDataSchema.validate(req.body);
    } catch (err) {
        resp.status(400).send({ error: err.message });
        return;
    }

    next();
};

module.exports = {
    userDataValidator,
    userIdValidator,
};
