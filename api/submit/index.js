module.exports = async function (context, req) {
    const data = req.body;

    const flowUrl = "https://defaultf1d9068e3b94400c90302c92ac8dbc.f6.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/064833865b844905a35b6c67a423567e/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=J5glW6syJVDSL_9RZ4Mf4LXIoqYRP_GOsHCP6Gl1EUw";

    await fetch(flowUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    context.res = {
        status: 200,
        body: {
            message: "保存完了",
            data: data
        }
    };
};
