export function checkImgExists(imgurl) {
    return new Promise(function(resolve, reject) {
        const imgObj = new Image(); // 判断图片是否存在

        imgObj.src = imgurl;

        imgObj.onload = function() {
            resolve(imgurl);
        };

        imgObj.onerror = function() {
            reject(`link类型图片获取失败：${imgurl}`);
        };
    });
}

export function toBlobPolyfill() {
    if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function(callback, type, quality) {
                var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                    len = binStr.length,
                    arr = new Uint8Array(len);

                for (var i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i);
                }

                callback(new Blob([arr], { type: type || 'image/png' }));
            }
        });
    }
}
