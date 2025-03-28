# 注意事項
この Client App 実装では、Client⇒S3にダイレクトアクセスするので、S3のデータが全世界に公開されます。
あくまで、PMTiles 読み取りのテストを行うコードです。
このソースコード実行による一切の責任は取りません。

# Client側のコード変更
MapComponent.tsx の 以下の行を修正
const PMTILES_URL = ""; // アップロードしたS3のPMTilesのURL

# S3 の設定
PMTiles を S3 にアップロード後、次の設定をS3バケットで行う事

## バケットのアクセス許可
ブロックパブリックアクセス (バケット設定)は、全てOFF(チェックを外す)
## バケットポリシー
```
{
    "Version": "2012-10-17",
    "Id": "",
    "Statement": [
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::バケット名/*" // ここは使用しているバケット名
        }
    ]
}
```
## Cross-Origin Resource Sharing (CORS)
```
[
    {
        "AllowedHeaders": [
            "range",
            "if-match"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "http://localhost:5173"
        ],
        "ExposeHeaders": [
            "etag"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

# 実行方法
* `docker-compose up --build` でコンテナ起動
* ブラウザで`http://localhost:5173/`にアクセス。
* 日本国土が青色っぽくなっていたら成功です。失敗していると、他の国と同じ色合いになります