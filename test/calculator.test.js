const offer_processor = require('../utils/offer_processor');
const expect = require('chai').expect;

const test_offer = {
    "Broker" : "Power To Choose",
    "Name" : "Super Saver - 36",
    "Term" : 36,
    "Company" : "Discount Power",
    "TDU" : {
        "Name" : "CPE",
        "Meter_Charge" : 5.47,
        "Variable_Charge" : 0.041084
    },
    "EFL_Url" : "https://signup.discountpowertx.com/PDFDocs/SS36J06181-1242007.pdf",
    "Price_At_500" : 0.105,
    "Price_At_1000" : 0.099,
    "Price_At_2000" : 0.096,
    "Link" : "https://signup.discountpowertx.com/SelectPlan.aspx?Zip=77082&PromoCode=PTCCNPSSR&ReferralCode=&TDSP=3&Type=1&Service=Electricity&meter=1&StateCode=TX",
    "Unique_Id" : 14020,
    "Cost_Components" : [
        {
            "Min" : 0,
            "Max": 500,
            "Amount" : 0.10,
            "Multiplicative" : true,
            "Compound" : true
        },
        {
            "Min" : 0,
            "Amount" : 0.0526,
            "Multiplicative" : true,
            "Compound" : true
        },
        {
            "Min": 500,
            "Max": 1000,
            "Amount": -20,
            "Multiplicative": false,
            "Compound": false
        }
    ],
    "key" : 76,
    "Actual_Price_At_500" : 0.105,
    "Actual_Price_At_1000" : 0.099,
    "Actual_Price_At_2000" : 0.096,
    "Approved" : true,
    "Is_Valid" : true
};

const test_tdu = {
    "Name" : "CPE",
    "Full_Name" : "CenterPoint Energy",
    "Meter_Charge" : 5.47,
    "Variable_Charge" : 0.041084
};

describe('offer calculator', function () {
    let result = offer_processor.get_usage_cost(test_offer, 1200, test_tdu);
    it('should get the average cost', function () {
        expect(result).to.be.a('number');
        expect(result).to.be.equal(167.89);
    });

    let results = offer_processor.get_usage_costs(test_offer, [500,1000,2000], test_tdu);
    it('should get an array of usage costs', function(){
        expect(results).to.be.a('Array');
    });

    let process = offer_processor.process_offers([test_offer], [500,1000,2000], test_tdu);
    it('should return an object of usage cost arrays', function(){
        expect(process).to.be.a('object');
    });
});