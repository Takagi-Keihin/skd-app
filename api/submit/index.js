const fetch = require("node-fetch");

module.exports = async function (context, req) {
    // ============================================
    // GETリクエスト → 名前リストを返す
    // ============================================
    if (req.method === "GET") {
        try {
            const flowUrl = "https://defaultf1d9068e3b94400c90302c92ac8dbc.f6.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/a25491149cda4cf9a48cb2434aea5aba/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HDJuDQfxYJfnj9-OJH6Z1vSGtcL2pBhvL4Sec-C7jS8";

            const res = await fetch(flowUrl, { method: "POST" });
            const data = await res.json();

            // Excelのテーブルから名前のみ抽出
            // 例: data.names = [{ 名前: "山田" }, { 名前: "佐藤" }]
            const names = data.names.map(x => x.名前);

            context.res = {
                status: 200,
                body: names
            };
        } catch (err) {
            context.res = {
                status: 500,
                body: { error: err.message }
            };
        }
        return;
    }

    // ============================================
    // POSTリクエスト → データを送信
    // ============================================
    if (req.method === "POST") {
        try {
            const data = req.body; // [{name: "山田", count: 3}, ...]

            // Power Automate保存用URL
            const saveUrl = "https://defaultf1d9068e3b94400c90302c92ac8dbc.f6.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/064833865b844905a35b6c67a423567e/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=J5glW6syJVDSL_9RZ4Mf4LXIoqYRP_GOsHCP6Gl1EUw";

            await fetch(saveUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ records: data }) // Apply to each用にラップ
            });

            context.res = {
                status: 200,
                body: { message: "送信完了", data: data }
            };
        } catch (err) {
            context.res = {
                status: 500,
                body: { error: err.message }
            };
        }
        return;
    }

    // ============================================
    // その他のメソッドは拒否
    // ============================================
    context.res = {
        status: 405,
        body: "Method Not Allowed"
    };
};
