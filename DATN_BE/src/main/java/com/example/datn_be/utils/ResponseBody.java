package com.example.datn_be.utils;

public class ResponseBody {
    private int code;
    private Object data;
    private String message;

    public ResponseBody(int code, Object data, String message) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    // Getters and setters
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
}
