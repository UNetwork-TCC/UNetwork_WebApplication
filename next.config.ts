import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Desativando a validação de módulos desconhecidos
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // Configuração para o Turbo e suporte a arquivos MP4
    turbo: {
      rules: {
        "*.mp4": [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash:8].[ext]",
              outputPath: "static/media/",
              publicPath: "/_next/static/media/",
            },
          },
        ],
      },
      resolveExtensions: [
        ".js",
        ".jsx",
        ".ts",
        ".tsx",
        ".md",
        ".mdx",
      ],
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[hash:8].[ext]",
            outputPath: "static/media/",
            publicPath: "/_next/static/media/",
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
