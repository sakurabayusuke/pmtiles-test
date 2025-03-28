# ベースイメージ
FROM node:22.14

# 作業ディレクトリ作成
WORKDIR /app

# パッケージファイルコピー & install
COPY package.json package-lock.json* ./
RUN npm install

# アプリのソースコードをコピー
COPY . .

# ポート指定（Viteデフォルト: 5173）
EXPOSE 5173

# 開発用コマンド（ホットリロード）
CMD ["npm", "run", "dev"]
