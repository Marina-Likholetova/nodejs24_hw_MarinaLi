const yup = require("yup");

const userDataSchema = yup.object().shape({
    username: yup
        .string()
        .strict()
        .typeError("should be a string")
        .trim()
        .min(1, "shoud be longer than 1 chart")
        .required("required"),
    email: yup.string().trim().email("Invalid email").required("required"),
});

const userIdSchema = yup
        .number()
        .typeError("must be a number")
        .required("required")
        .positive("must be a positive")
        .integer("must be an integer")

const userIdValidator = async (req, resp, next) => {
    try {
        const parsed = await userIdSchema.validate(req.params.userId);
        req.params.userId = parsed;
    } catch (err) {
        const errors = {
            userId: err.message
        };
        resp.status(400).send({ error: errors });
        return;
    }

    next();
};

const userDataValidator = async (req, resp, next) => {
    try {
        await userDataSchema.validate(req.body, { abortEarly: false });
    } catch (err) {
        const errors = err.inner.reduce((acc, curr) => {
            if (!acc[curr.path]) {
                acc[curr.path] = [];
            }

            acc[curr.path].push(curr.message);
            return acc;
        }, {});

        resp.status(400).send({ error: errors });
        return;
    }

    next();
};

module.exports = {
    userDataValidator,
    userIdValidator,
};
