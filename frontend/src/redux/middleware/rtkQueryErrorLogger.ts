/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { isRejectedWithValue } from "@reduxjs/toolkit";
import history from "history/browser";
import Cookies from "js-cookie";

const ERROR_CODES = [403, 500];

const rtkQueryErrorLogger = () => (next: any) => (action: any) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
    if (isRejectedWithValue(action)) {
        if (action.payload.status === 401) {
            Cookies.remove("token");
            window.location.href = "/app/auth/login";
        } else {
            const errMessage =
                action.payload.data?.message || action.error.data?.message || action.error.message;

            alert(errMessage);

            if (ERROR_CODES.includes(action.payload.status)) {
                history.back();
            }
        }
    }

    return next(action);
};

export default rtkQueryErrorLogger;
