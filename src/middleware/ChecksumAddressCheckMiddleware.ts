import { Provide } from '@midwayjs/decorator';
import {
  Context,
  IMidwayWebNext,
  IWebMiddleware,
  MidwayWebMiddleware,
} from '@midwayjs/web';
import { ObjUtils } from '../util/ObjUtils';
import { StrUtils } from '../util/StrUtils';

@Provide()
export class ChecksumAddressCheckMiddleware implements IWebMiddleware {
  resolve(): MidwayWebMiddleware {
    return async (ctx: Context, next: IMidwayWebNext) => {
      const query = ctx.query;
      // in query
      // TODO only convert user address in v2 api
      if (ctx.request.url.startsWith('/v2') && ObjUtils.isNotNull(query)) {
        // check dataOwner
        this.checkAddressInQuery(query, 'dataOwner');

        // check who
        this.checkAddressInQuery(query, 'who');
      }
      await next();
    };
  }

  private checkAddressInQuery(query: any, key: string) {
    const address = query[key];
    if (StrUtils.isNotEmpty(address)) {
      // use hex address
      query[key] = address.toLowerCase();
    }
  }
}
