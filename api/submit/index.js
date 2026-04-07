module.exports = async function (context, req) {
    const data = req.body;

    context.log("受信データ:", data);

    context.res = {
        status: 200,
        body: {
            message: "データ受信成功",
            data: data
        }
    };
};
