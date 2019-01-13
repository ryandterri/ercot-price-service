const offer_processor = require('../utils/offer_processor');
const expect = require('chai').expect;

const test_offers = [
    {
        "Name": "Super Saver - 36",
        "Term": 36,
        "Company": "Discount Power",
        "TDU": {
            "Name": "CPE",
            "Full_Name": "CenterPoint Energy",
            "Meter_Charge": 5.47,
            "Variable_Charge": 0.041084
        },
        "Cost_Components": [
            {
                "Min": 0,
                "Max": 500,
                "Amount": 0.10,
                "Multiplicative": true,
                "Compound": true
            },
            {
                "Min": 0,
                "Amount": 0.0526,
                "Multiplicative": true,
                "Compound": true
            },
            {
                "Min": 500,
                "Max": 1000,
                "Amount": -20,
                "Multiplicative": false,
                "Compound": false
            },
            {
                "Min": 500,
                "Max": 1000,
                "Amount": -20,
                "Multiplicative": false,
                "Compound": true
            },
            {
                "Min": 500,
                "Max": 1000,
                "Amount": 0.02,
                "Multiplicative": true,
                "Compound": false
            },
            {
                "Min": 600,
                "Max": 1000,
                "Amount": 0.02,
                "Multiplicative": true,
                "Compound": true
            }
        ]
    },
    {
        "Name" : "Simple Value 12",
        "Term" : 12,
        "Company" : "TXU Energy",
        "Is_Bundled": true,
        "TDU": {
            "Name": "CPE",
            "Full_Name": "CenterPoint Energy",
            "Meter_Charge": 5.47,
            "Variable_Charge": 0.041084
        },
        "Cost_Components" : [
            {
                "Min" : 0,
                "Amount" : 9.95,
                "Multiplicative" : false,
                "Compound" : true
            },
            {
                "Min" : 0,
                "Amount" : 0.086,
                "Multiplicative" : true,
                "Compound" : true
            }
        ]
    },
    {
        "Name" : "Simple Value 12",
        "Term" : 12,
        "Company" : "TXU Energy",
        "Is_Bundled": true,
        "TDU": {
            "Name": "CPE",
            "Full_Name": "CenterPoint Energy",
            "Meter_Charge": 5.47,
            "Variable_Charge": 0.041084
        },
        "Cost_Components" : [
            {
                "Min" : 0,
                "Amount" : 99.95,
                "Multiplicative" : false,
                "Compound" : true
            },
            {
                "Min" : 0,
                "Amount" : 0.086,
                "Multiplicative" : true,
                "Compound" : true
            }
        ]
    }
];



describe('offer calculator', function () {
    let result = offer_processor.get_usage_cost(test_offers[0],1200);
    it('should get the average cost', function () {
        expect(result).to.be.a('number');
        expect(result).to.be.equal(155.89);
    });

    let result2 = offer_processor.get_usage_cost(test_offers[1], 650);
    it('should get the average cost', function () {
        expect(result2).to.be.a('number');
    });

    let results = offer_processor.get_usage_costs(test_offers[0], [500, 1000, 2000]);
    it('should get an array of usage costs', function () {
        expect(results).to.be.a('Array');
    });

    let process = offer_processor.process_offers(test_offers, [500, 1000, 2000]);
    it('should return an object of usage cost arrays', function () {
        expect(process).to.be.a('object');
    });
});