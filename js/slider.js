function Sim(sldrId) {

	let id = document.getElementById(sldrId);
	if(id) {
		this.sldrRoot = id
	}
	else {
		this.sldrRoot = document.querySelector('.sim-slider')
	};

	// Carousel objects
	this.sldrList = this.sldrRoot.querySelector('.sim-slider-list');
	this.sldrElements = this.sldrList.querySelectorAll('.sim-slider-element');
	this.sldrElemFirst = this.sldrList.querySelector('.sim-slider-element');
	this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
	this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');
	this.indicatorDots = this.sldrRoot.querySelector('div.sim-slider-dots');

	// Initialization
	this.options = Sim.defaults;
	Sim.initialize(this)
};

Sim.defaults = {

	// Default options for the carousel
	loop: true,     // Р‘РµСЃРєРѕРЅРµС‡РЅРѕРµ Р·Р°С†РёРєР»РёРІР°РЅРёРµ СЃР»Р°Р№РґРµСЂР°
	auto: true,     // РђРІС‚РѕРјР°С‚РёС‡РµСЃРєРѕРµ РїСЂРѕР»РёСЃС‚С‹РІР°РЅРёРµ
	interval: 3000, // РРЅС‚РµСЂРІР°Р» РјРµР¶РґСѓ РїСЂРѕР»РёСЃС‚С‹РІР°РЅРёРµРј СЌР»РµРјРµРЅС‚РѕРІ (РјСЃ)
	arrows: true,   // РџСЂРѕР»РёСЃС‚С‹РІР°РЅРёРµ СЃС‚СЂРµР»РєР°РјРё
	dots: true      // РРЅРґРёРєР°С‚РѕСЂРЅС‹Рµ С‚РѕС‡РєРё
};

Sim.prototype.elemPrev = function(num) {
	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement -= num;
	if(this.currentElement < 0) this.currentElement = this.elemCount-1;

	if(!this.options.loop) {
		if(this.currentElement == 0) {
			this.leftArrow.style.display = 'none'
		};
		this.rightArrow.style.display = 'block'
	};

	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[prevElement].style.opacity = '0';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Sim.prototype.elemNext = function(num) {
	num = num || 1;

	let prevElement = this.currentElement;
	this.currentElement += num;
	if(this.currentElement >= this.elemCount) this.currentElement = 0;

	if(!this.options.loop) {
		if(this.currentElement == this.elemCount-1) {
			this.rightArrow.style.display = 'none'
		};
		this.leftArrow.style.display = 'block'
	};

	this.sldrElements[this.currentElement].style.opacity = '1';
	this.sldrElements[prevElement].style.opacity = '0';

	if(this.options.dots) {
		this.dotOn(prevElement); this.dotOff(this.currentElement)
	}
};

Sim.prototype.dotOn = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;'
};

Sim.prototype.dotOff = function(num) {
	this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;'
};

Sim.initialize = function(that) {

	// Constants
	that.elemCount = that.sldrElements.length; // РљРѕР»РёС‡РµСЃС‚РІРѕ СЌР»РµРјРµРЅС‚РѕРІ

	// Variables
	that.currentElement = 0;
	let bgTime = getTime();

	// Functions
	function getTime() {
		return new Date().getTime();
	};
	function setAutoScroll() {
		that.autoScroll = setInterval(function() {
			let fnTime = getTime();
			if(fnTime - bgTime + 10 > that.options.interval) {
				bgTime = fnTime; that.elemNext()
			}
		}, that.options.interval)
	};

	// Start initialization
	if(that.elemCount <= 1) {   // РћС‚РєР»СЋС‡РёС‚СЊ РЅР°РІРёРіР°С†РёСЋ
		that.options.auto = false; that.options.arrows = false; that.options.dots = false;
		that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};
	if(that.elemCount >= 1) {   // РїРѕРєР°Р·Р°С‚СЊ РїРµСЂРІС‹Р№ СЌР»РµРјРµРЅС‚
		that.sldrElemFirst.style.opacity = '1';
	};

	if(!that.options.loop) {
		that.leftArrow.style.display = 'none';  // РѕС‚РєР»СЋС‡РёС‚СЊ Р»РµРІСѓСЋ СЃС‚СЂРµР»РєСѓ
		that.options.auto = false; // РѕС‚РєР»СЋС‡РёС‚СЊ Р°РІС‚РѕРїСЂРєСЂСѓС‚РєСѓ
	}
	else if(that.options.auto) {   // РёРЅРёС†РёР°Р»РёР·Р°С†РёСЏ Р°РІС‚РѕРїСЂРѕРєСЂСѓРєРё
		setAutoScroll();
		// РћСЃС‚Р°РЅРѕРІРєР° РїСЂРѕРєСЂСѓС‚РєРё РїСЂРё РЅР°РІРµРґРµРЅРёРё РјС‹С€Рё РЅР° СЌР»РµРјРµРЅС‚
		that.sldrList.addEventListener('mouseenter', function() {clearInterval(that.autoScroll)}, false);
		that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
	};

	if(that.options.arrows) {  // РёРЅРёС†РёР°Р»РёР·Р°С†РёСЏ СЃС‚СЂРµР»РѕРє
		that.leftArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > 1000) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};

	if(that.options.dots) {  // РёРЅРёС†РёР°Р»РёР·Р°С†РёСЏ РёРЅРґРёРєР°С‚РѕСЂРЅС‹С… С‚РѕС‡РµРє
		let sum = '', diffNum;
		for(let i=0; i<that.elemCount; i++) {
			sum += '<span class="sim-dot"></span>'
		};
		that.indicatorDots.innerHTML = sum;
		that.indicatorDotsAll = that.sldrRoot.querySelectorAll('span.sim-dot');
		// РќР°Р·РЅР°С‡Р°РµРј С‚РѕС‡РєР°Рј РѕР±СЂР°Р±РѕС‚С‡РёРє СЃРѕР±С‹С‚РёСЏ 'click'
		for(let n=0; n<that.elemCount; n++) {
			that.indicatorDotsAll[n].addEventListener('click', function() {
				diffNum = Math.abs(n - that.currentElement);
				if(n < that.currentElement) {
					bgTime = getTime(); that.elemPrev(diffNum)
				}
				else if(n > that.currentElement) {
					bgTime = getTime(); that.elemNext(diffNum)
				}
				// Р•СЃР»Рё n == that.currentElement РЅРёС‡РµРіРѕ РЅРµ РґРµР»Р°РµРј
			}, false)
		};
		that.dotOff(0);  // С‚РѕС‡РєР°[0] РІС‹РєР»СЋС‡РµРЅР°, РѕСЃС‚Р°Р»СЊРЅС‹Рµ РІРєР»СЋС‡РµРЅС‹
		for(let i=1; i<that.elemCount; i++) {
			that.dotOn(i)
		}
	}
};

new Sim();
