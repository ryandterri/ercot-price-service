const _ = require('lodash');

let offer_processor = {};

offer_processor.get_usage_cost = function (offer, usage) {
    let usage_cost = 0;
    let cost_components = offer.Cost_Components;
    cost_components.forEach(function (cost_component) {
        if (cost_component.Compound) {
            if (cost_component.Min <= usage) {
                if (cost_component.Max && usage > cost_component.Max) {
                    usage_cost += cost_component.Multiplicative ? cost_component.Amount * (cost_component.Max - cost_component.Min) : cost_component.Amount;
                }
                else {
                    usage_cost += cost_component.Multiplicative ? cost_component.Amount * (usage - cost_component.Min) : cost_component.Amount;
                }
            }
        }
        else {
            if (cost_component.Min <= usage && (cost_component.Max == null || usage <= cost_component.Max)) {
                usage_cost += cost_component.Multiplicative ? cost_component.Amount * usage : cost_component.Amount;
            }
        }
    });
    if (offer.Is_Bundled === undefined || offer.Is_Bundled === null || !offer.Is_Bundled) {
        usage_cost += offer.TDU.Meter_Charge;
        usage_cost += offer.TDU.Variable_Charge * usage;
    }
    return Math.round(usage_cost * 100) / 100;
};

offer_processor.get_usage_costs = function (offer, usages) {
    let usage_costs = [];
    usages.forEach(function (usage) {
        let usage_cost = offer_processor.get_usage_cost(offer, usage, offer.TDU);
        usage_costs.push(usage_cost);
    });
    return usage_costs;
};

offer_processor.process_offers = function (filtered_offers, usages) {
    usages = _.map(usages, function (usage) {
        return parseInt(usage);
    });
    let usage_total = usages.reduce(function (total, amt) {
        return parseInt(total) + parseInt(amt);
    });
    let results = [];
    let grand_total = 0;
    filtered_offers.forEach(function (offer) {
        let offer_result = {
            Name: offer.Name,
            Company: offer.Company,
            Term: offer.Term,
            Approved: offer.Approved,
            Price_At_500: offer.Price_At_500,
            Actual_Price_At_500: offer.Actual_Price_At_500,
            Price_At_1000: offer.Price_At_1000,
            Actual_Price_At_1000: offer.Actual_Price_At_1000,
            EFL: offer.EFL_Url,
            Link: offer.Link,
            Usage_Costs: []
        };

        offer_result.Usage_Costs = offer_processor.get_usage_costs(offer, usages);

        offer_result.Total = offer_result.Usage_Costs.reduce(function (total, amt) {
            return total + amt;
        });
        offer_result.Average_Per_Month = offer_result.Total / offer_result.Usage_Costs.length;
        offer_result.Average_Price_Per_kWh = offer_result.Total / usage_total;
        results.push(offer_result);
        grand_total += offer_result.Total;
    });
    let mean = grand_total / filtered_offers.length;
    let sub_variance = 0;
    results.forEach(function (result) {
        sub_variance += Math.pow(result.Total - mean, 2);
    });
    let variance = sub_variance / filtered_offers.length;
    let std_dev = Math.sqrt(variance);
    let low = mean - std_dev;
    let high = mean + std_dev;
    results.forEach(function (result) {
        if (result.Total >= high) {
            result.Grade = "Bad";
        }
        else if (result.Total <= low) {
            result.Grade = "Good";
        }
        else {
            result.Grade = "Average";
        }
    });
    return {
        usage_total: usage_total,
        usages: usages,
        mean: mean,
        std_dev: std_dev,
        avg_mean: mean / usages.length,
        avg_std_dev: std_dev / usages.length,
        results: results
    };
};

module.exports = offer_processor;
