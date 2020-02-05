(function () {
    "use strict";

    describe("LNPay", function () {
        it("sanity check", function () {
            expect(true).toBe(true);
        });

        it("should expose the sdk", function () {
            expect( LNPay ).toBeDefined();
        });

        it("should have a method called GetPage", function () {
            expect( LNPay.setDefaultWalletAccessKey ).toBeDefined();
        });

    });
})();
