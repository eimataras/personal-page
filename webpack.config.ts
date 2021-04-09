import path from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import MiniSccExtractPlugin from 'mini-css-extract-plugin';

const configuration = {
    entry: {
        app: './src/index.tsx'
    },

    output: {
        path: path.resolve(__dirname, 'build'), // output folder name
        filename: 'bundle.js'                   // file name of project build
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'  // runs babel presets to transpile the code to ES5
                    }
                ]
            },

            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader' // reads index.html file
                    }
                ]
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniSccExtractPlugin.loader,
                    'css-loader',                   // Translates CSS into CommonJS
                    'sass-loader',                  // Compiles Sass to CSS
                ],
            },
        ]
    },

    plugins: [
        new HtmlPlugin({		         // moves html file to dist/build folder on npm run build
            filename: 'index.html',      // output filename
            template: './src/index.html' // use template from
        }),
        new MiniSccExtractPlugin()
    ],

    devServer: {
        historyApiFallback: true,
        port: 3000                      // the port we run dev server on
    }
};

export default configuration;
