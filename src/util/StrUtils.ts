export class StrUtils {
  static isNotEmpty(str: string) {
    return !StrUtils.isEmpty(str);
  }

  static isEmpty(str: string) {
    return str === undefined || str === null || str === '';
  }
}
