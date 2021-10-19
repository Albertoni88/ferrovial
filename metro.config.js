// module.exports = (async () => {
//     const {
//       resolver: { sourceExts, assetExts }
//     } = await getDefaultConfig();
//     return {
//       transformer: {
//         babelTransformerPath: require.resolve("react-native-svg-transformer")
//       },
//       resolver: {
//         assetExts: assetExts.filter(ext => ext !== "svg"),
//         sourceExts: [...sourceExts, "svg"]
//       }
//     };
//   })();

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// get defaults assetExts array
const defaultAssetExts = require("metro-config/src/defaults/defaults").assetExts;

module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
    resolver: {
        assetExts: [
            ...defaultAssetExts, // <- array spreading defaults
            'md'
        ]
    }
};
