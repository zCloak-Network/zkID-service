import dayjs from 'dayjs';

export class DateUtils {
  static DEFAULT_FORMAT_STR = 'YYYY-MM-DD HH:mm:ss';

  static format(date: Date) {
    return dayjs(date).format(DateUtils.DEFAULT_FORMAT_STR);
  }
}
