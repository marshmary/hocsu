import moment from "moment";
import * as yup from "yup";
import { AnyObject, Maybe } from "yup/lib/types";

const REGEX_PASSWORD = /^[a-zA-Z0-9!@#$%^&*_-]{6,32}$/;
const REGEX_NAME =
    /^(?![\s.]+$)[一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９々〆〤ヶa-zA-Z0-9aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s.]*$/u;
const REGEX_ONLY_NUMBER = /^\d+$/;

yup.addMethod<yup.StringSchema>(yup.string, "password", function (message) {
    return this.matches(REGEX_PASSWORD, {
        message,
        excludeEmptyString: true,
    });
});

yup.addMethod<yup.StringSchema>(yup.string, "onlyNumber", function (message) {
    return this.matches(REGEX_ONLY_NUMBER, {
        message,
        excludeEmptyString: true,
    });
});

yup.addMethod<yup.StringSchema>(yup.string, "name", function (message) {
    return this.matches(REGEX_NAME, {
        message,
        excludeEmptyString: true,
    });
});

yup.addMethod<yup.StringSchema>(yup.string, "dateFormat", function (message) {
    return this.test(`test-date-format`, message, function (value) {
        const { path, createError } = this;

        if (value && value.length < 4) {
            value = `${"0".repeat(4 - value.length)}${value}`;
        }

        return (
            (value &&
                (moment(value, "YYYY", true).isValid() ||
                    moment(value, "YYYY-MM", true).isValid() ||
                    moment(value, "YYYY-MM-DD", true).isValid())) ||
            createError({ path, message: message })
        );
    });
});

declare module "yup" {
    interface StringSchema<
        TType extends Maybe<string> = string | undefined,
        TContext extends AnyObject = AnyObject,
        TOut extends TType = TType
    > extends yup.BaseSchema<TType, TContext, TOut> {
        password(message: string): StringSchema<TType, TContext>;
        name(message: string): StringSchema<TType, TContext>;
        dateFormat(message: string): StringSchema<TType, TContext>;
    }

    interface NumberSchema<
        TType extends Maybe<number> = number | undefined,
        TContext extends AnyObject = AnyObject,
        TOut extends TType = TType
    > extends yup.BaseSchema<TType, TContext, TOut> {}
}

export default yup;
