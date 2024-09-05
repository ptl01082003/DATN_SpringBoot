package com.example.datn_be.utils;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;




@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse {
    public enum ResponseCode {
        SUCCESS(200),
        ERRORS(400),
        INCORRECT(401);

        private final int code;

        ResponseCode(int code) {
            this.code = code;
        }

        public int getCode() {
            return code;
        }
    }
    @JsonProperty("code")
    private int code;

    @JsonProperty("data")
    private Object data;

    @JsonProperty("message")
    private String message;

    public ApiResponse() {
    }

    public ApiResponse(int code, Object data, String message) {
        this.code = code;
        this.data = data;
        this.message = message;
    }


    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "ApiResponse{" +
                "code=" + code +
                ", data=" + data +
                ", message='" + message + '\'' +
                '}';
    }


    public static ApiResponse success(Object data, String message) {
        return new ApiResponse(ResponseCode.SUCCESS.getCode(), data, message);
    }

    public static ApiResponse error(ResponseCode responseCode, String message) {
        return new ApiResponse(responseCode.getCode(), null, message);
    }
}
