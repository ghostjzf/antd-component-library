import { defineConfig } from 'dumi';

export default defineConfig({
    title: 'jigsaw',
    mode: 'site',
    logo: 'https://static.tigerbbs.com/af9dad0af797b1218bdb10f577900ff7',
    favicon: 'https://static.tigerbbs.com/af9dad0af797b1218bdb10f577900ff7',
    outputPath: 'umi-static',
    extraBabelPlugins: [
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css'
            }
        ]
    ],
    runtimePublicPath: true,
    publicPath: './',
    exportStatic: { dynamicRoot: true },
    navs: [
        null,
        {
            title: '更新日志',
            path: 'https://git.tigerbrokers.net/fed/npm/jigsaw/-/blob/master/CHANGELOG.md'
        }
    ]
});
