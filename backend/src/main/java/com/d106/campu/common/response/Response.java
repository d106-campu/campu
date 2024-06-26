package com.d106.campu.common.response;

import java.util.HashMap;

public class Response extends HashMap<String, Object> {

    private static final long serialVersionUID = 1L;

    public static final String RESULT = "result";
    public static final String CODE = "code";
    public static final String MESSAGE = "message";
    public static final String OK = "ok";
    public static final String FAIL = "fail";
    public static final String DATA = "data";
    private HashMap<Object, Object> response = new HashMap<>();

    public Response() {
        setData(Response.RESULT, Response.OK);
    }

    public Response(String key, Object DATA) {
        this();
        response.put(key, DATA);
        setData(Response.DATA, response);
    }

    public void setData(String key, Object data) {
        put(key, data);
    }

    public void setDataIntoResponse(String key, Object data) {
        response.put(key, data);
    }

    public Object getData(String key) {
        return get(key);
    }

}
