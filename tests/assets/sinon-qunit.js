/*global sinon, QUnit, test*/
sinon.assert.fail = function (msg) {
    QUnit.ok(false, msg);
};

sinon.assert.pass = function (assertion) {
    QUnit.ok(true, assertion);
};

sinon.config = {
    injectIntoThis: true,
    injectInto: null,
    properties: ["spy", "stub", "mock", "clock", "sandbox"],
    useFakeTimers: false,
    useFakeServer: false
};

(function (global) {
    var qTest = QUnit.test;
    
    QUnit.test = global.test = function (testName, expected, callback, async) {
        if (arguments.length === 2) {
            callback = expected;
            expected = null;
        }

        return qTest(testName, expected, sinon.test(callback), async);
    };
}(this));
