Ext.define('Rally.technicalservices.Validator',{

    validationRuleObj: undefined,
    records: undefined,

    ruleViolationData: undefined,

    constructor: function(config){
        Ext.apply(this,config);
        this._validate();
    },

    _validate: function(){
        if (this.validationRuleObj && this.records){
            var validationRuleObj = this.validationRuleObj,
                ruleViolationRecords = [],
                totalRecords = 0,
                rules = validationRuleObj.getRules();

            _.each(this.records, function(r){
                totalRecords ++;
                var violations = [];
                _.each(rules, function(rule){
                    var v = validationRuleObj[rule](r);
                    if (v){
                        violations.push({rule: rule, text: v});
                    }
                });

                if (violations.length > 0){
                    ruleViolationRecords.push({
                        ObjectID: r.get('ObjectID'),
                        _ref: r.get('_ref'),
                        FormattedID: r.get('FormattedID'),
                        Name: r.get('Name'),
                        violations: violations,
                        Project: r.get('Project').Name,
                        _type: r.get('_type')
                    });
                }
            });
            this.ruleViolationData = ruleViolationRecords;
        }
    }
});