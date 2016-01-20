<?php
/*
Plugin Name: AddressFinder
Plugin URI: https://github.com/Abletech/woocommerce-addressfinder
Version: 1.0.1
Author: Abletech
Description: Woocommerce address finder plugin for autocompleting addresses in New Zealand and Australia
 */

if ( ! defined( 'ABSPATH' ) ) { 
	exit;
}

/**
 * Check if WooCommerce is active
 **/
if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
	add_action( 'woocommerce_after_checkout_form', 'add_addressfinder_widget' );
	add_action( 'woocommerce_after_edit_address_form_billing', 'add_addressfinder_widget' );
	add_action( 'woocommerce_after_edit_address_form_shipping', 'add_addressfinder_widget' );

	function add_addressfinder_widget( $checkout ) {
		$path = plugin_dir_path( __FILE__ );
    $af_key_nz = esc_attr( get_option( 'af-key' ) );
    $af_key_au = esc_attr( get_option( 'af-key-au' ) );
    $addressfinder_js = file_get_contents( $path . 'addressfinder.js' );
		echo "<script>var afKey = '{ $af_key_nz }';\n var afKeyAu = '{ $af_key_au }';\n { $addressfinder_js }</script>";
	}

	add_filter( 'woocommerce_get_sections_checkout', 'add_addressfinder_settings' );
	function add_addressfinder_settings( $sections ) {

		$sections['addressfinder'] = __( 'AddressFinder', 'text-domain' );
		return $sections;

	}

	add_filter( 'woocommerce_get_settings_checkout', 'addressfinder_settings', 10, 1 );
	function addressfinder_settings( $settings ) {
		$settings[] = array( 'name' => __( 'AddressFinder Settings', 'text-domain' ),
			'type' => 'title',
			'desc' => __( 'AddressFinder supports New Zealand and Australia. You may enter a key for either, or both.', 'text-domain' ),
			'id' => 'addressfinder-widget' );

		$settings[] = array(
			'name'     => __( 'Key for New Zealand', 'text-domain' ),
			'desc_tip' => __( 'The Key shown in the AddressFinder portal', 'text-domain' ),
			'id'       => 'af-key',
			'type'     => 'text',
			'desc'     => __( 'Find your AddressFinder Key from <a href="https://portal.addressfinder.io" target="_blank">AddressFinder Portal</a>', 'text-domain' ),
		);

		$settings[] = array(
			'name'     => __( 'Key for Australia', 'text-domain' ),
			'desc_tip' => __( 'The Key shown in the AddressFinder Australian portal', 'text-domain' ),
			'id'       => 'af-key-au',
			'type'     => 'text',
			'desc'     => __( 'Find your AddressFinder Key from <a href="https://portal.addressfinder.io" target="_blank">AddressFinder Portal</a>', 'text-domain' ),
		);

		$settings[] = array( 'type' => 'sectionend', 'id' => 'addressfinder-widget' );
		return $settings;
	}
}
?>
