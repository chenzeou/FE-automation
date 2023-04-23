/*
 * @Author: chenzeou
 * @Date: 2023-04-23 12:30:29
 */
/**
 * 对象转url
 * @param obj
 */
function objectToQueryString(obj: Record<string, any>): string {
    const keyValuePairs = [];

    for (const key in obj) {
        const value = obj[key];
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }

    return keyValuePairs.join('&');
}