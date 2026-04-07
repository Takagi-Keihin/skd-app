const fetch = require("node-fetch");

module.exports = async function (context, req) {
    // 名前取得用URL
    const nameFlowUrl = "https://defaultf1d9068e3b94400c90302c92ac8dbc.f6.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/a25491149cda4cf9a48cb2434aea5aba/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HDJuDQfxYJfnj9-OJH6Z1vSGtcL2pBhvL4Sec-C7jS8";

    // データ保存用URL
    const saveFlowUrl = "https://defaultf1d9068e3b94400c90302c92ac8dbc.f6.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/064833865b844905a35b6c67a423567e/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=J5glW6syJVDSL_9RZ4Mf4LXIoqYRP_GOsHCP6Gl1EUw";

    try {
        if (req.method === "GET") {
            // 名前リスト取得
            const res = await fetch(nameFlowUrl, {
                method: "POST", // FlowはPOSTで呼び出す
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}) // GETでもBodyが必要な場合がある
            });
            if (!res.ok) throw new Error(`名前取得フローが失敗: ${res.status} ${res.statusText}`);
            const data = await res.json();

            // data の形に応じて配列を作る
            // 例: { "names": [ {"名前":"山田"}, {"名前":"佐藤"} ] }
            const names = Array.isArray(data.names) ? data.names.map(x => x.名前) : [];
            context.res = { status: 200, body: names };
        }
        else if (req.method === "POST") {
            // データ保存
            const data = req.body;

            if (!data || !Array.isArray(data)) {
                context.res = { status: 400, body: { message: "送信データが不正です" } };
                return;
            }

            const res = await fetch(saveFlowUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error(`保存フローが失敗: ${res.status} ${res.statusText}`);

            context.res = { status: 200, body: { message: "保存完了", data } };
        }
        else {
            context.res = { status: 405, body: { message: "Method Not Allowed" } };
        }
    } catch (err) {
        context.res = { status: 500, body: { message: "エラー発生", error: err.message } };
    }
};
