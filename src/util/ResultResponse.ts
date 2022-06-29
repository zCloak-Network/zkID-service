/**
 * result vo.
 */
export class ResultResponse {
  private static CODE_SUCCESS = 200;

  private static CODE_ERROR = 500;

  code: number;

  data: any;

  message: string;

  static success(data?: any, message?: string) {
    const resultVO = new ResultResponse();
    resultVO.code = ResultResponse.CODE_SUCCESS;
    resultVO.data = data;
    resultVO.message = message;
    return resultVO;
  }

  static error(message: string) {
    const resultVO = new ResultResponse();
    resultVO.code = ResultResponse.CODE_ERROR;
    resultVO.message = message;
    return resultVO;
  }
}
