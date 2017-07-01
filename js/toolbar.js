(function(window, $, cachify_ajax_object) {

	$(function() {

		// Register click handler
		$('#wp-admin-bar-cachify').on('click', function() {

			var $ab_cachify = $(this);

			if ($ab_cachify.hasClass('cachify-is-working')) {
				// AJAX request is still being processed...
				return;
			}

			// Signal to user that Cachify is working
			$ab_cachify.removeClass('cachify-success').removeClass('cachify-error').addClass('cachify-is-working');

			// Perform an Ajax request
			$.ajax({
				url      : cachify_ajax_object.ajaxurl,
				data     : {action: 'cachify_flush_cache', _ajax_nonce: cachify_ajax_object.nonce},
				dataType : 'json',
				cache    : false,
				timeout  : 0, // no timeout
				error    : function() {
                    $ab_cachify.addClass('cachify-error');
                },
				success  : function(response) {
                    $ab_cachify.addClass(response.success ? 'cachify-success' : 'cachify-error');
				},
				complete : function() {
                    setTimeout(function() {
                        $ab_cachify.removeClass('cachify-is-working').removeClass('cachify-error').removeClass('cachify-success');
                    }, 1000);
				}
			});
		});
	});
})(window, jQuery, cachify_ajax_object);
