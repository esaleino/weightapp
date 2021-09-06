export const loadAllAssets = () => {
  /* write to localStorage */
  return ajaxSVG(
    'closeScene',
    '/assets/svg/close-scene-ani.svg'
  );
  //...
};

export const ajaxSVG = (assetName, path) => {
  return new Promise((resolve, reject) => {
    try {
      let request = new XMLHttpRequest();
      request.open('GET', path, true);
      request.onload = function (e) {
        if (request.status >= 200 && request.status < 400) {
          let data = request.responseText;
          localStorage.setItem(assetName, data);
          resolve();
        } else
          reject(
            'Bad request. request status: ' + request.status
          );
      };
      request.send();
    } catch (e) {
      reject(e);
    }
  });
};
