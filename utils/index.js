function setup() {
    const req = {
        params: {},
        body: {},
    };
    const res = {};
    Object.assign(res, {
        status: jest.fn(
            function status() {
                return this;
            }.bind(res)
        ),
        json: jest.fn(
            function json() {
                return this;
            }.bind(res)
        ),
        send: jest.fn(
            function send() {
                return this;
            }.bind(res)
        ),
    });
    return {req, res};
}

module.exports = {setup};
