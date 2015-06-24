var Current = require('../core/current.js');
var Spinner = require('../widgets/spinner.js');
var config = require('../views/config.js');
var log = require('../core/log.js');

function increment(v, i, max) {
	v += i;
    if (v < 1) {
    	v = 1;
    }
    return v;
}

function create(battle) {
	var current = Current.get(battle);
	var composite = tabris.create("Composite", {
    	id: 'victoryView',
    	//background: "white",
    	layoutData: {centerX: 0, top: config.PAGE_MARGIN},
        highlightOnTouch: true
	});

    var spinBritish = Spinner.create('British', current.britishVP, true, {left: 0, right: [0,3], top: 0}, function(valueView, incr) {
    	current = Current.get(battle);
    	current.britishVP = increment(current.britishVP, incr);
    	valueView.set("text", current.britishVP);
        Current.save(current);
	}).appendTo(composite);
    
    var spinAmerican = Spinner.create('American', current.americanVP, true, {left: 0, right: [0,3], top: [spinBritish,5]}, function(valueView, incr) {
    	current = Current.get(battle);
    	current.americanVP = increment(current.americanVP, incr);
    	valueView.set("text", current.americanVP);
        Current.save(current);
	}).appendTo(composite);
    
    composite.reset = function() {
    	current = Current.get(battle);
        spinBritish.setValue(current.britishVP);
        spinAmerican.setValue(current.americanVP);
    }
    
	return composite;
}

module.exports = {
	create: function(battle) {
    	log.debug('Creating Victory for ' + battle.name);
    	return create(battle);
    }
};
