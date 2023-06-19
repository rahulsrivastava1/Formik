import React, { useState } from "react";
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    FieldArray,
    FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
    name: "Rahul",
    email: "",
    channel: "",
    comments: "",
    address: "",
    social: {
        facebook: "",
        twitter: "",
    },
    phoneNumbers: ["", ""],
    phNumbers: [""],
};

const savedData = {
    name: "Rahul",
    email: "rahul@gmail.com",
    channel: "ReactFormik",
    comments: "Welcome to React Formik",
    address: "Delhi, India",
    social: {
        facebook: "",
        twitter: "",
    },
    phoneNumbers: ["", ""],
    phNumbers: [""],
};

const onSubmit = (values, onSubmitProps) => {
    console.log(values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    channel: Yup.string().required("Required"),
    // comments: Yup.string().required("Required"),
});

const validateComments = (value) => {
    let error;
    if (!value) {
        error = "Required";
    }
    return error;
};

function NewYouTubeForm() {
    const [formValues, setFormValues] = useState(null);

    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
            enableReinitialize
        >
            {(formik) => {
                return (
                    <Form>
                        <h2>YouTube Form</h2>
                        <div className="form-control">
                            <label htmlFor="name">Name</label>
                            <Field type="text" id="name" name="name" />
                            <ErrorMessage name="name" component={TextError} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email">
                                {(errorMsg) => <div className="error">{errorMsg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="form-control">
                            <label htmlFor="channel">Channel</label>
                            <FastField
                                type="text"
                                id="channel"
                                name="channel"
                                placeholder="Enter your youtube channel name"
                            />
                            <ErrorMessage name="channel" component={TextError} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="comments">Comments</label>
                            <Field
                                as="textarea"
                                id="comments"
                                name="comments"
                                validate={validateComments}
                            />
                            <ErrorMessage name="comments" component={TextError} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="address">Address</label>
                            <Field name="address">
                                {(props) => {
                                    const { field, form, meta } = props;
                                    return (
                                        <div>
                                            <input type="text" id="address" {...field} />
                                            {meta.touched && meta.error && (
                                                <div className="error">{meta.error}</div>
                                            )}
                                        </div>
                                    );
                                }}
                            </Field>
                        </div>
                        <div className="form-control">
                            <label htmlFor="facebook">Facebook profile</label>
                            <Field type="text" id="facebook" name="social.facebook" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="twitter">Twitter profile</label>
                            <Field type="text" id="twitter" name="social.twitter" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="primaryPh">Primary Phone Number</label>
                            <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="secondaryPh">Secondary Phone Number</label>
                            <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
                        </div>
                        <div className="form-control">
                            <label>List of Phone Numbers</label>
                            <FieldArray name="phNumbers">
                                {(fieldArrayProps) => {
                                    const { push, remove, form } = fieldArrayProps;
                                    const { values } = form;
                                    const { phNumbers } = values;
                                    return (
                                        <div>
                                            {phNumbers.map((phNumber, index) => (
                                                <div key={index}>
                                                    <Field type="text" name={`phNumbers[${index}]`} />
                                                    {index > 0 && (
                                                        <button type="button" onClick={() => remove(index)}>
                                                            -
                                                        </button>
                                                    )}
                                                    <button type="button" onClick={() => push("")}>
                                                        +
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }}
                            </FieldArray>
                        </div>
                        {/* <button
                            type="button"
                            onClick={() => formik.validateField("comments")}
                        >
                            Validate Comments
                        </button>
                        <button type="button" onClick={() => formik.validateForm()}>
                            Validate all
                        </button>
                        <button
                            type="button"
                            onClick={() => formik.setFieldTouched("comments")}
                        >
                            Visit Comments
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                formik.setTouched({
                                    name: true,
                                    email: true,
                                    channel: true,
                                    comments: true,
                                })
                            }
                        >
                            Visit all
                        </button> */}
                        {/* <button type="submit" disabled={!formik.isValid}> */}
                        <button type="submit" onClick={() => setFormValues(savedData)}>Load Saved Data</button>
                        <button type="reset">Reset</button>
                        <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
                            Submit
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default NewYouTubeForm;
