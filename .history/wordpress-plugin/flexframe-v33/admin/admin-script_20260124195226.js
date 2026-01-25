/**
 * FlexFrame Admin JavaScript
 */
(function($) {
    'use strict';
    
    $(document).ready(function() {
        
        // Media uploader instance
        let mediaUploader;
        
        // Upload logo button
        $('#flexframe_upload_logo_button').on('click', function(e) {
            e.preventDefault();
            
            // If the uploader already exists, reopen it
            if (mediaUploader) {
                mediaUploader.open();
                return;
            }
            
            // Create a new media uploader
            mediaUploader = wp.media({
                title: 'Select Logo Image',
                button: {
                    text: 'Use this image'
                },
                library: {
                    type: 'image'
                },
                multiple: false
            });
            
            // When an image is selected
            mediaUploader.on('select', function() {
                const attachment = mediaUploader.state().get('selection').first().toJSON();
                
                // Set the URL in the input field
                $('#flexframe_logo_url').val(attachment.url);
                
                // Show preview
                $('#flexframe_logo_preview').html(
                    '<img src="' + attachment.url + '" alt="Logo Preview" style="max-width: 200px; max-height: 200px; margin-top: 10px;">'
                ).show();
                
                // Show remove button
                $('#flexframe_remove_logo_button').show();
            });
            
            // Open the uploader
            mediaUploader.open();
        });
        
        // Remove logo button
        $('#flexframe_remove_logo_button').on('click', function(e) {
            e.preventDefault();
            
            // Clear the input field
            $('#flexframe_logo_url').val('');
            
            // Hide preview
            $('#flexframe_logo_preview').hide().html('');
            
            // Hide remove button
            $(this).hide();
        });
        
        // Toggle live preview
        $('#toggle-preview-btn').on('click', function(e) {
            e.preventDefault();
            const $button = $(this);
            const $container = $('#live-preview-container');
            
            if ($container.is(':visible')) {
                // Hide preview
                $container.slideUp(300);
                $button.html('<span class="dashicons dashicons-visibility"></span> Show Preview');
            } else {
                // Show preview
                $container.slideDown(300);
                $button.html('<span class="dashicons dashicons-hidden"></span> Hide Preview');
                
                // Reload iframe if it exists
                const $iframe = $('#live-preview-iframe');
                if ($iframe.length) {
                    const src = $iframe.attr('src');
                    $iframe.attr('src', src);
                }
            }
        });
        
    });
    
})(jQuery);
