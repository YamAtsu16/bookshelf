/**
 * リクエストのエラーハンドリング
 * @param {*} controller 関数定義
 * @returns 関数実行
 */
function requestErrorHandler(controller) {
  return async (req, res, next) => {
    try {
      return await controller(req, res);
    } catch(err) {
      console.log(err);
      next(err); // app.jsの21行目が呼ばれる
    }
  }
};

export { requestErrorHandler };