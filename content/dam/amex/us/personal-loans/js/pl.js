$(window).load(function(){
  $(".navBG").sticky({ topSpacing: 0, zIndex: 99 });
});

var FairRate=14.99;
var GoodRate=11.99;
var VeryGoodRate=8.99;
var ExcellentRate=6.99;
var interestRate=ExcellentRate/100/12;
var payments=36;

$(".calc-results, .calc-results-footnote-box").hide();

$("#ratePulldown").on("change",function() {
	rateRange=$(this).val();

	if(rateRange=="Poor") {
		$(".calc-results").hide();
		$(".calc-results-footnote-box").hide();
		$(".PoorRate").show();
	} else {
		$(".PoorRate").hide();
		$(".calc-results-footnote-box").show();
		if(rateRange != '') {
			interestRate=eval(rateRange + "Rate")/100/12;
			updateAmt($('#loanAmountEntered').val());
			$(".calc-results, .calc-results-footnote-box").show();
		} else {
			$(".calc-results, .calc-results-footnote-box").hide();
		}
	}
});

var source=getParameterByName("eep");

if(source == null && sessionStorage["source"] != null) {  //there is already a value in sessionStorage from another page so use that
	source=sessionStorage["source"];
}

if(source == null) { source="6990" }  //no value for eep in the querystring so use this default

if(source != '') {
	sessionStorage["source"]=source;
	$(".cta, .nav-box-link").each(function() {
		currentURL=$(this).attr("href");
		newURL=currentURL + "&eep=" + source;
		$(this).attr("href", newURL);
	});
}

function updateAmt(la) {

	$('#loanAmountEntered').val(addCommas(la));

	la=la.replace(',','')
	la=la.replace('$','')

	if(la > 0) {
		var x = Math.pow(1 + interestRate, payments);
		var pmt = (la*x*interestRate)/(x-1);

		if(la >= 3500 && la <= 25000) {
			$("#fixedInterestRates").hide();
			$("#estimateMyCreditScore").show();
			$("#pay12").html("$" + Math.ceil(findPayment(12,la)).toLocaleString());
			$("#pay24").html("$" + Math.ceil(findPayment(24,la)).toLocaleString());
			$("#pay36").html("$" + Math.ceil(findPayment(36,la)).toLocaleString());
			$("#calc-step2").removeClass("calc-step-disabled");
			$("#ratePulldown").removeAttr("disabled", "disabled");
			$("#between").css({"color":"#333"});
		} else {
			$("#calc-step2").addClass("calc-step-disabled");
			$("#ratePulldown").attr("disabled", "disabled");
			$("#between").css({"color":"#F00"});
			$("#pay12, #pay24, #pay36").html("-")
		}

	}

}

function findPayment(p,a) {
	var x = Math.pow(1 + interestRate, p);
	return (a*x*interestRate)/(x-1);
}

function addCommas(x) {
	x = x.replace(/\D/g,'');
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}	

function getParameterByName(name, url) {
	if (!url) {
	  url = window.location.href;
	}
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

