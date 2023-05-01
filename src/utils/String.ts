/*
 * @Author: chenzeou
 * @Date: 2023-04-22 12:30:14
 */
// 首字母小写
export const firstToLowerCase = (str: string | undefined) => {

    return str ? str[0].toLowerCase() + str.substr(1) : '';
};
// 首字母大写
export const firstToUpperCase = (str: string) => {
    return str[0].toUpperCase() + str.substr(1);
};
/**
 * 生成state的name
 * @param url 接口url
 * @param firstUpperCase 首字母是否大写
 */
export const getStateName = (url: string, firstUpperCase = true) => {
    const arr = url.split('/');
    let name = '';
    // 把接口分割出来，然后再用驼峰式拼接，
    arr.forEach((item, index) => {
        name += index === 0 && !firstUpperCase ? item : firstToUpperCase(item);
    });
    return name;
};
/**
 * 生成action的name
 * @param service 所属后台网关 决定这个action的唯一性
 * @param url 接口地址
 */
export const getActionName = (service: string, url: string) => {
    //
    return `${service}${getStateName(url)}`;
};
/**
 * 判断某个字符出现的次数
 * @param str 输入字符串
 * @param char 判断出现的字符
 */
export const countOccurrences = (str: string | undefined, char: string): number => {
    return ((str || '').split(char).length - 1);
}