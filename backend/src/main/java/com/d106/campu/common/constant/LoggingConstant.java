package com.d106.campu.common.constant;

import java.util.List;

public class LoggingConstant {

    public static final List<String> JDBC_QUERY_METHOD_LIST = List.of("execute", "executeQuery", "executeUpdate");

    public static final int MAX_PAYLOAD_LENGTH = 1000;

    public static final String HIKARI_CONNECTION_NAME = "HikariProxyConnection";

    public static final String JDBC_PREPARE_STATEMENT_METHOD_NAME = "prepareStatement";

}
