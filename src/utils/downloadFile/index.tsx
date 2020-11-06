import { AxiosRequestConfig, AxiosStatic } from 'axios';
import { message } from 'antd';
import Loading from '../../Loading';

export interface DownloadFileConfig extends AxiosRequestConfig {
    url: string;
    fileName: string;
}

const downloadFile = async (http: AxiosStatic, config: DownloadFileConfig) => {
    const { url, fileName, ...restConfig } = config;
    const defaultConfig = {
        responseType: 'blob',
        headers: {
            Accept: 'text/plain, */*'
        }
    };

    Loading.global(true, 'Loading...');

    try {
        let blob;

        if (config?.method === 'post') {
            const { data, ..._config } = restConfig;

            blob = await http.post(url, data, { ...defaultConfig, ..._config }).then(res => res);
        } else {
            blob = await http.get(url, { ...defaultConfig, ...restConfig }).then(res => res);
        }

        const localHref = URL.createObjectURL(blob);
        const ele = document.createElement('a');

        ele.href = localHref;
        ele.setAttribute('download', fileName);

        document.querySelectorAll('body')[0].appendChild(ele);
        ele.click();

        message.success('success');

        setTimeout(() => {
            URL.revokeObjectURL(localHref);
            ele.remove();
        }, 1000);

        return true;
    } catch (err) {
        try {
            const res = await new Response(err.response.data).json();

            message.error(res.msg);
        } catch (e) {
            message.error(err.error_msg || err.message);
        }

        return false;
    } finally {
        Loading.global(false);
    }
};

export default downloadFile;
