$(document).ready(function() {

	// Save the selected search result in the list by adding a new line
	function saveSearch(keyword) {
		var rightNow = new Date();
		var time = rightNow.toISOString().slice(0,16).replace(/T/," ");

		var element = $("<div class='searches-item'></div>");
		$("#searches").prepend(element);
		element.append("<div class='searches-item-margin'>&nbsp;</div>");
		element.append("<div class='searches-item-keyword'><div class='inner'>" + keyword + "</div></div>");
		element.append("<div class='searches-item-margin'>&nbsp;</div>");
		element.append("<div class='searches-item-date'><div class='inner'>" + time + "</div></div>");
		element.append("<div class='searches-item-margin'>&nbsp;</div>");
		element.append("<div class='searches-item-delete'><div class='inner'><img class='deleteIcon' src='assets/circle-with-cross.svg' alt='Delete icon'></div></div>");

	}

	// Populate the autocomplete with data from iTunes API
	$("#keyword").autocomplete({
		source: function( request, response ) {
			$.ajax({
				url: "https://itunes.apple.com/search",
				dataType: "jsonp",
				data: {
					term: request.term,
					attribute: 'movieTerm',
					entity: 'movie',
					limit: 10
				},
				success: function(data) {
					response($.map(data.results, function(item) {
						return {
							label: item.trackName
						}
					}));
				},
			});
		},
		minLength: 2,
		select: function( event, ui ) {
			saveSearch(ui.item.label);
		},
		close: function() {
			$("#keyword").val("");
		},
	});

	// Remove all highlights on mouseout
	$(document).on("mouseout", ".searches-item", function() {
		$(".searches-item").removeClass('marked');
	});

	// Add highlight on mouseover
	$(document).on("mouseover", ".searches-item", function() {
		$(this).addClass('marked');
	});

	// Remove the line on click on the circled X
	$(document).on("click", ".searches-item-delete", function() {
		$(this).parents(".searches-item").remove();
	});
});
