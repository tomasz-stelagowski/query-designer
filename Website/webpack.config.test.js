const webpack = require('webpack');
const path = require('path');

const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const isDevBuild = process.env.ASPNETCORE_ENVIRONMENT === 'Production' ? false : true;
const devTool = isDevBuild ? 'source-map' : '';

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.ts']
    },
    entry: {
        main: ['./ClientApp/main-client.ts']
    },
    output: {
        path: path.join(__dirname, './wwwroot', 'dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            { test: /\.ts$/, include: /ClientApp/, loader: 'ts-loader', query: { silent: true } },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.css$/, loader: 'to-string-loader!css-loader' },
            { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader', query: { limit: 25000 } },
            { test: /.less$/, exclude: /node_modules/, loader: 'raw-loader!less-loader' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                'development': true
            }
        }),
        new ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('./Client')
        ),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        })
    ].concat(isDevBuild ? [] : [
        new DefinePlugin({
            'process.env': {
                'production': true
            }
        }),
        new webpack.NormalModuleReplacementPlugin(
            /@angular(\\|\/)compiler/,
            root('empty.js')
        ),
        new webpack.optimize.UglifyJsPlugin()
    ]),

    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};

function plugins(plugins, config) {
    config.plugins = config.plugins.concat(plugins);
    return config
}

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}