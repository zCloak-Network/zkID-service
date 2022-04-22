export class ArrUtils {
  static isNotEmpty<T>(arr: T[]) {
    return arr && arr.length && arr.length > 0;
  }

  static isEmpty<T>(arr: T[]) {
    return !ArrUtils.isNotEmpty(arr);
  }
}
