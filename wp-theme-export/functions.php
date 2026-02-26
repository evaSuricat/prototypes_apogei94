<?php
/**
 * Twenty Twenty-Four Child – Apogei
 */

/**
 * 1. Styles thème parent + enfant.
 */
function mte_enqueue_styles() {
    $parent_style = 'twentytwentyfour-style';

    wp_enqueue_style(
        $parent_style,
        get_template_directory_uri() . '/style.css',
        [],
        wp_get_theme( get_template() )->get( 'Version' )
    );

    wp_enqueue_style(
        'twentytwentyfour-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        [ $parent_style ],
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'wp_enqueue_scripts', 'mte_enqueue_styles' );

/**
 * Styles de l’éditeur (pour refléter les paddings/couleurs).
 */
function apogei_setup_editor_styles() {
    add_editor_style( 'style.css' );
}
add_action( 'after_setup_theme', 'apogei_setup_editor_styles' );

/**
 * Classe de thème visuel Apogei sur <body>.
 * Par défaut : apo-theme-1 (officiel).
 */
function apogei_body_class_theme( $classes ) {
    // À terme, viendront d’options ; pour l’instant, tu peux éditer ici.
    $active_theme = apply_filters( 'apogei_active_theme_class', 'apo-theme-1' );      // apo-theme-1 / 2 / 3
    $active_fonts = apply_filters( 'apogei_active_fonts_class', 'apo-font-pair-0' );  // apo-font-pair-0 (défaut) / 1 / 2 / 3

    foreach ( [ $active_theme, $active_fonts ] as $class ) {
        if ( $class && ! in_array( $class, $classes, true ) ) {
            $classes[] = $class;
        }
    }

    return $classes;
}
add_filter( 'body_class', 'apogei_body_class_theme' );


/**
 * Enregistrement des emplacements de menus.
 */
function apogei_register_menus() {
    register_nav_menus(
        array(
            'primary' => __( 'Menu principal', 'twentytwentyfour-child-avec-templateparts' ),
        )
    );
}
add_action( 'after_setup_theme', 'apogei_register_menus' );

/**
 * 1.1 Header responsive : script mobile-menu + injection URL logo SVG.
 */
function apogei_enqueue_mobile_menu() {
    wp_enqueue_script(
        'apogei-mobile-menu',
        get_stylesheet_directory_uri() . '/js/apogei-mobile-menu.js',
        [],
        wp_get_theme()->get( 'Version' ),
        true
    );

    $logo_url = get_stylesheet_directory_uri() . '/assets/images/logo_apogei.svg';
    wp_add_inline_script(
        'apogei-mobile-menu',
        'document.querySelectorAll("img[data-logo=apogei]").forEach(function(img){img.src="' . esc_url( $logo_url ) . '";})',
        'after'
    );
}
add_action( 'wp_enqueue_scripts', 'apogei_enqueue_mobile_menu' );

/**
 * 2. JS interface (tabs + accordéons).
 */
function apogei_enqueue_interface_script() {
    wp_enqueue_script(
        'apogei-interface',
        get_stylesheet_directory_uri() . '/js/apogei-interface.js',
        [],
        wp_get_theme()->get( 'Version' ),
        true
    );
}
add_action( 'wp_enqueue_scripts', 'apogei_enqueue_interface_script' );

/**
 * 2.2 Nav secondaire fiche (scroll doux + IntersectionObserver).
 * Chargé uniquement sur single etablissement et dispositif.
 */
function apogei_enqueue_nav_secondaire_script() {
	if ( ! is_singular( [ 'etablissement', 'dispositif' ] ) ) {
		return;
	}
	wp_enqueue_script(
		'apogei-nav-secondaire',
		get_stylesheet_directory_uri() . '/js/apogei-nav-secondaire.js',
		[],
		wp_get_theme()->get( 'Version' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'apogei_enqueue_nav_secondaire_script' );

/**
 * 2.1 Iconify (SVG) pour les icônes locales.
 */
function apogei_get_iconify_collections() {
    $manifest_path = get_stylesheet_directory() . '/assets/iconify/manifest.json';
    $collections   = [];

    if ( file_exists( $manifest_path ) ) {
        $manifest = json_decode( file_get_contents( $manifest_path ), true );
        if ( isset( $manifest['collections'] ) && is_array( $manifest['collections'] ) ) {
            $collections = $manifest['collections'];
        }
    }

    if ( empty( $collections ) ) {
        $collections = [
            [
                'name' => 'dashicons',
                'file' => 'dashicons.json',
            ],
        ];
    }

    return $collections;
}

function apogei_enqueue_iconify_assets() {
    $collections = apogei_get_iconify_collections();

    wp_enqueue_script(
        'apogei-iconify',
        get_stylesheet_directory_uri() . '/js/iconify-icon.min.js',
        [],
        wp_get_theme()->get( 'Version' ),
        true
    );

    wp_enqueue_script(
        'apogei-iconify-loader',
        get_stylesheet_directory_uri() . '/js/iconify-loader.js',
        [ 'apogei-iconify' ],
        wp_get_theme()->get( 'Version' ),
        true
    );

    wp_localize_script(
        'apogei-iconify-loader',
        'ApogeiIconify',
        [
            'baseUrl'     => get_stylesheet_directory_uri() . '/assets/iconify',
            'collections' => $collections,
        ]
    );
}
add_action( 'wp_enqueue_scripts', 'apogei_enqueue_iconify_assets' );

/**
 * 2.1.1 Iconify (SVG) pour l’éditeur Gutenberg (canvas iframe).
 */
function apogei_enqueue_iconify_block_assets() {
    if ( ! is_admin() ) {
        return;
    }

    $collections = apogei_get_iconify_collections();

    wp_enqueue_script(
        'apogei-iconify',
        get_stylesheet_directory_uri() . '/js/iconify-icon.min.js',
        [],
        wp_get_theme()->get( 'Version' ),
        true
    );

    wp_enqueue_script(
        'apogei-iconify-loader',
        get_stylesheet_directory_uri() . '/js/iconify-loader.js',
        [ 'apogei-iconify' ],
        wp_get_theme()->get( 'Version' ),
        true
    );

    wp_localize_script(
        'apogei-iconify-loader',
        'ApogeiIconify',
        [
            'baseUrl'     => get_stylesheet_directory_uri() . '/assets/iconify',
            'collections' => $collections,
        ]
    );
}
add_action( 'enqueue_block_assets', 'apogei_enqueue_iconify_block_assets' );

/**
 * 2.1.2 Config blocs Gutenberg "Icône Apogei" et "Bouton Apogei" (liste d’icônes + couleurs).
 */
function apogei_enqueue_icon_block_editor_config() {
    $theme_dir  = get_stylesheet_directory();
    $theme_uri  = get_stylesheet_directory_uri();
    $apogei_json = $theme_dir . '/assets/iconify/apogei.json';
    $dashicons_json = $theme_dir . '/assets/iconify/dashicons.json';
    $ver_apogei    = file_exists( $apogei_json ) ? (string) filemtime( $apogei_json ) : '';
    $ver_dashicons = file_exists( $dashicons_json ) ? (string) filemtime( $dashicons_json ) : '';
    $config = [
        'collections'       => [
            [
                'prefix' => 'apogei',
                'url'    => $theme_uri . '/assets/iconify/apogei.json' . ( $ver_apogei ? '?ver=' . $ver_apogei : '' ),
            ],
            [
                'prefix' => 'dashicons',
                'url'    => $theme_uri . '/assets/iconify/dashicons.json' . ( $ver_dashicons ? '?ver=' . $ver_dashicons : '' ),
            ],
        ],
        'allowedColorSlugs' => [
            'text-default',
            'text-inverse',
            'text-brand',
            'bg-accent-green',
            'bg-accent-orange',
            'bg-accent-magenta',
            'bg-accent-cyan',
            'bg-accent-yellow',
        ],
    ];
    if ( wp_script_is( 'apogei-icon-editor-script', 'registered' ) ) {
        wp_localize_script( 'apogei-icon-editor-script', 'ApogeiIconBlock', $config );
    }
    if ( wp_script_is( 'apogei-button-editor-script', 'registered' ) ) {
        wp_localize_script( 'apogei-button-editor-script', 'ApogeiIconBlock', $config );
    }
}
add_action( 'enqueue_block_editor_assets', 'apogei_enqueue_icon_block_editor_config' );

/**
 * 2.2 Retirer la font Dashicons côté front (conservée en admin).
 */
function apogei_dequeue_dashicons_font() {
    if ( is_admin() || is_customize_preview() ) {
        return;
    }

    $keep_dashicons = false;

    if ( function_exists( 'max_mega_menu_is_enabled' ) && max_mega_menu_is_enabled() ) {
        $keep_dashicons = true;
    }

    if ( defined( 'APOGEI_FORCE_KEEP_DASHICONS_FRONT' ) ) {
        $keep_dashicons = (bool) APOGEI_FORCE_KEEP_DASHICONS_FRONT;
    }

    $keep_dashicons = apply_filters( 'apogei_keep_dashicons_font', $keep_dashicons );

    if ( $keep_dashicons ) {
        return;
    }

    wp_dequeue_style( 'dashicons' );
    wp_deregister_style( 'dashicons' );
}
add_action( 'wp_enqueue_scripts', 'apogei_dequeue_dashicons_font', 20 );

/**
 * 2.3 Shortcode [apogei_icon] (temporaire, à retirer quand le bloc Gutenberg existe).
 *
 * Usage: [apogei_icon name="bonhome-unapei" size="md" color="var(--wp--preset--color--primary)"]
 */
function apogei_icon_shortcode( $atts ) {
    $atts = shortcode_atts(
        [
            'name'  => '',
            'size'  => '',
            'color' => '',
            'set'   => 'apogei',
            'class' => '',
        ],
        $atts,
        'apogei_icon'
    );

    $name = sanitize_key( $atts['name'] );
    if ( '' === $name ) {
        return '';
    }

    $set = sanitize_key( $atts['set'] );
    if ( '' === $set ) {
        $set = 'apogei';
    }

    $classes = [ 'apogei-icon' ];
    $size    = sanitize_key( $atts['size'] );
    if ( in_array( $size, [ 'xs', 'sm', 'md', 'lg', 'xl' ], true ) ) {
        $classes[] = 'icon--' . $size;
    }

    $extra_class = sanitize_html_class( $atts['class'] );
    if ( '' !== $extra_class ) {
        $classes[] = $extra_class;
    }

    $style_attr = '';
    $color      = trim( (string) $atts['color'] );
    if ( '' !== $color && preg_match( '/^var\(--[a-z0-9\-]+\)$/i', $color ) ) {
        $style_attr = ' style="color: ' . esc_attr( $color ) . ';"';
    }

    return sprintf(
        '<iconify-icon icon="%s:%s" class="%s" aria-hidden="true"%s></iconify-icon>',
        esc_attr( $set ),
        esc_attr( $name ),
        esc_attr( implode( ' ', $classes ) ),
        $style_attr
    );
}
add_shortcode( 'apogei_icon', 'apogei_icon_shortcode' );

/**
 * 2.4 Bloc Gutenberg "Icône Apogei".
 */
function apogei_register_icon_block() {
    register_block_type( __DIR__ . '/blocks/apogei-icon' );
}
add_action( 'init', 'apogei_register_icon_block' );

/**
 * 2.4.1 Bloc Gutenberg "Bouton Apogei" (style + icônes gauche/droite).
 */
function apogei_register_button_block() {
    register_block_type(
        __DIR__ . '/blocks/apogei-button',
        [
            'render_callback' => 'apogei_button_render',
        ]
    );
}
add_action( 'init', 'apogei_register_button_block' );

/**
 * 2.4.2 Blocs Gutenberg hero fiche (établissement / dispositif).
 */
function apogei_register_hero_fiche_blocks() {
    register_block_type(
        __DIR__ . '/blocks/apogei-hero-sous-titre',
        [ 'render_callback' => 'apogei_hero_sous_titre_render' ]
    );
    register_block_type(
        __DIR__ . '/blocks/apogei-hero-introduction',
        [ 'render_callback' => 'apogei_hero_introduction_render' ]
    );
}
add_action( 'init', 'apogei_register_hero_fiche_blocks' );

/**
 * Enregistrement des meta keys pour les blocs Content Area (plugin Content Area Block).
 * Utilisées par les sections Équipe, Actualités, Jobs des fiches établissement/dispositif.
 *
 * Prérequis : les CPT etablissement et dispositif doivent supporter 'custom-fields'
 * pour que la meta soit exposée dans la REST API (requis par editEntityRecord).
 */
function apogei_register_content_area_meta() {
	$post_types = [ 'etablissement', 'dispositif' ];
	$meta_keys  = [
		'_apogei_section_presentation',
		'_apogei_section_equipe',
		'_apogei_section_actualites',
		'_apogei_section_jobs',
	];

	// Requis pour que la meta soit exposée dans la REST API (block editor).
	foreach ( $post_types as $post_type ) {
		add_post_type_support( $post_type, 'custom-fields' );
	}

	// Format aligné sur le plugin Content Area Block (schema + context edit).
	foreach ( $post_types as $post_type ) {
		foreach ( $meta_keys as $meta_key ) {
			register_post_meta(
				$post_type,
				$meta_key,
				[
					'type'          => 'string',
					'single'        => true,
					'show_in_rest'  => [
						'schema' => [
							'type'    => 'string',
							'context' => [ 'view', 'edit' ],
						],
					],
					'auth_callback' => function ( $allowed, $meta_key, $post_id ) {
						return current_user_can( 'edit_post', $post_id );
					},
				]
			);
		}
	}
}
add_action( 'init', 'apogei_register_content_area_meta', 20 );

/**
 * 2.5 CPT Offre (offres d'emploi).
 * Lié à etablissement ou dispositif via ACF fiche_associee.
 *
 * Migration : remplace l'ancien repeater ACF "offres" sur etablissement/dispositif.
 * À faire manuellement : supprimer le champ repeater "offres" des groupes ACF
 * établissement et dispositif (ACF > Groupes de champs).
 */
function apogei_register_cpt_offre() {
	register_post_type(
		'offre',
		[
			'labels'              => [
				'name'               => _x( 'Offres', 'post type general name', 'twentytwentyfour-child-avec-templateparts' ),
				'singular_name'      => _x( 'Offre', 'post type singular name', 'twentytwentyfour-child-avec-templateparts' ),
				'menu_name'          => _x( 'Offres', 'admin menu', 'twentytwentyfour-child-avec-templateparts' ),
				'add_new'            => _x( 'Ajouter', 'offre', 'twentytwentyfour-child-avec-templateparts' ),
				'add_new_item'       => __( 'Ajouter une offre', 'twentytwentyfour-child-avec-templateparts' ),
				'edit_item'          => __( 'Modifier l\'offre', 'twentytwentyfour-child-avec-templateparts' ),
				'new_item'           => __( 'Nouvelle offre', 'twentytwentyfour-child-avec-templateparts' ),
				'view_item'          => __( 'Voir l\'offre', 'twentytwentyfour-child-avec-templateparts' ),
				'search_items'       => __( 'Rechercher des offres', 'twentytwentyfour-child-avec-templateparts' ),
				'not_found'          => __( 'Aucune offre trouvée', 'twentytwentyfour-child-avec-templateparts' ),
				'not_found_in_trash' => __( 'Aucune offre dans la corbeille', 'twentytwentyfour-child-avec-templateparts' ),
			],
			'public'              => true,
			'publicly_queryable'  => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 25,
			'menu_icon'           => 'dashicons-portfolio',
			'capability_type'     => 'post',
			'has_archive'         => true,
			'hierarchical'        => false,
			'supports'            => [ 'title', 'editor', 'revisions' ],
			'show_in_rest'        => true,
		]
	);
}
add_action( 'init', 'apogei_register_cpt_offre', 5 );

/**
 * 2.6 Groupe ACF pour le CPT Offre.
 */
function apogei_register_acf_offre_fields() {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}
	acf_add_local_field_group(
		[
			'key'                   => 'group_apogei_offre',
			'title'                 => __( 'Champs offre', 'twentytwentyfour-child-avec-templateparts' ),
			'fields'                => [
				[
					'key'           => 'field_apogei_offre_fiche',
					'label'         => __( 'Fiche associée', 'twentytwentyfour-child-avec-templateparts' ),
					'name'          => 'fiche_associee',
					'type'          => 'post_object',
					'required'      => 1,
					'post_type'     => [ 'etablissement', 'dispositif' ],
					'return_format' => 'id',
					'instructions'  => __( 'Établissement ou dispositif concerné par cette offre.', 'twentytwentyfour-child-avec-templateparts' ),
				],
				[
					'key'          => 'field_apogei_offre_url',
					'label'        => __( 'Lien vers l\'offre', 'twentytwentyfour-child-avec-templateparts' ),
					'name'         => 'url',
					'type'         => 'url',
					'instructions' => __( 'URL externe (plateforme recrutement, etc.).', 'twentytwentyfour-child-avec-templateparts' ),
				],
				[
					'key'  => 'field_apogei_offre_type_contrat',
					'label' => __( 'Type de contrat', 'twentytwentyfour-child-avec-templateparts' ),
					'name'  => 'type_contrat',
					'type'  => 'text',
					'placeholder' => 'ex. CDI - 37h, CDD 6 mois',
				],
				[
					'key'  => 'field_apogei_offre_description',
					'label' => __( 'Description', 'twentytwentyfour-child-avec-templateparts' ),
					'name'  => 'description',
					'type'  => 'textarea',
					'rows'  => 4,
				],
				[
					'key'          => 'field_apogei_offre_date_publication',
					'label'        => __( 'Date de publication', 'twentytwentyfour-child-avec-templateparts' ),
					'name'         => 'date_publication',
					'type'         => 'date_picker',
					'display_format' => 'd/m/Y',
					'return_format' => 'Y-m-d',
				],
				[
					'key'          => 'field_apogei_offre_date_limite',
					'label'        => __( 'Date limite', 'twentytwentyfour-child-avec-templateparts' ),
					'name'         => 'date_limite',
					'type'         => 'date_picker',
					'display_format' => 'd/m/Y',
					'return_format' => 'Y-m-d',
				],
			],
			'location'              => [
				[
					[
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'offre',
					],
				],
			],
		]
	);
}
add_action( 'acf/init', 'apogei_register_acf_offre_fields' );

/**
 * Rendu du bloc Sous-titre hero (champ ACF sous_titre_hero, H2 style H3).
 *
 * @param array    $attributes Attributs (non utilisés).
 * @param string   $content    Contenu (non utilisé).
 * @param WP_Block $block     Instance du bloc (contexte postId).
 * @return string HTML.
 */
function apogei_hero_sous_titre_render( $attributes, $content, $block ) {
    $post_id = isset( $block->context['postId'] ) ? (int) $block->context['postId'] : get_the_ID();
    if ( ! $post_id || ! function_exists( 'get_field' ) ) {
        return '';
    }
    $post = get_post( $post_id );
    if ( ! $post || ! in_array( $post->post_type, [ 'etablissement', 'dispositif' ], true ) ) {
        return '';
    }
    $sous_titre = get_field( 'sous_titre_hero', $post_id );
    if ( $sous_titre === null || $sous_titre === '' ) {
        return '';
    }
    return '<h2 class="apogei-hero-sous-titre">' . esc_html( $sous_titre ) . '</h2>';
}

/**
 * Rendu du bloc Introduction hero (champ ACF introduction_hero, WYSIWYG).
 *
 * @param array    $attributes Attributs (non utilisés).
 * @param string   $content    Contenu (non utilisé).
 * @param WP_Block $block     Instance du bloc (contexte postId).
 * @return string HTML.
 */
function apogei_hero_introduction_render( $attributes, $content, $block ) {
    $post_id = isset( $block->context['postId'] ) ? (int) $block->context['postId'] : get_the_ID();
    if ( ! $post_id || ! function_exists( 'get_field' ) ) {
        return '';
    }
    $post = get_post( $post_id );
    if ( ! $post || ! in_array( $post->post_type, [ 'etablissement', 'dispositif' ], true ) ) {
        return '';
    }
    $intro = get_field( 'introduction_hero', $post_id );
    if ( $intro === null || $intro === '' ) {
        return '';
    }
    return '<div class="apogei-hero-introduction">' . wp_kses_post( $intro ) . '</div>';
}

/**
 * Balise iconify-icon pour le bloc Bouton Apogei (avec couleur optionnelle).
 *
 * @param string $prefix Préfixe (dashicons|apogei).
 * @param string $name   Nom de l’icône.
 * @param string $color  Valeur CSS (ex. var(--wp--preset--color--text-brand)) ou vide.
 * @return string HTML <iconify-icon>.
 */
function apogei_button_iconify_markup( $prefix, $name, $color = '' ) {
    $style = $color ? ' style="color:' . esc_attr( $color ) . '"' : '';
    return sprintf(
        '<iconify-icon icon="%1$s:%2$s" class="apogei-icon icon--md" aria-hidden="true"%3$s></iconify-icon>',
        esc_attr( $prefix ),
        esc_attr( $name ),
        $style
    );
}

/**
 * Rendu du bloc Bouton Apogei (lien + icônes optionnelles).
 *
 * @param array    $attributes Attributs du bloc.
 * @param string   $content    Contenu (non utilisé, bloc dynamique).
 * @param WP_Block $block     Instance du bloc.
 * @return string HTML du bouton.
 */
function apogei_button_render( $attributes, $content, $block ) {
    $style = isset( $attributes['style'] ) && is_string( $attributes['style'] ) ? $attributes['style'] : 'apogei-primary';
    $allowed_styles = [
        'apogei-primary',
        'apogei-outline',
        'apogei-transparent',
        'apogei-accent-green',
        'apogei-xl-outline-primary',
        'apogei-outline-accent',
    ];
    if ( ! in_array( $style, $allowed_styles, true ) ) {
        $style = 'apogei-primary';
    }
    $text   = isset( $attributes['text'] ) ? $attributes['text'] : 'Bouton';
    $url    = isset( $attributes['url'] ) ? esc_url( $attributes['url'] ) : '#';
    $target = ! empty( $attributes['linkTarget'] ) ? ' target="' . esc_attr( $attributes['linkTarget'] ) . '" rel="noopener noreferrer"' : '';

    $icon_left_show   = ! empty( $attributes['iconLeftShow'] );
    $icon_left_src    = isset( $attributes['iconLeftSource'] ) && $attributes['iconLeftSource'] === 'apogei' ? 'apogei' : 'dashicons';
    $icon_left_name   = isset( $attributes['iconLeftName'] ) ? sanitize_key( $attributes['iconLeftName'] ) : '';
    $icon_left_color  = isset( $attributes['iconLeftColor'] ) && is_string( $attributes['iconLeftColor'] ) ? $attributes['iconLeftColor'] : '';
    $icon_right_show  = ! empty( $attributes['iconRightShow'] );
    $icon_right_src   = isset( $attributes['iconRightSource'] ) && $attributes['iconRightSource'] === 'apogei' ? 'apogei' : 'dashicons';
    $icon_right_name  = isset( $attributes['iconRightName'] ) ? sanitize_key( $attributes['iconRightName'] ) : '';
    $icon_right_color = isset( $attributes['iconRightColor'] ) && is_string( $attributes['iconRightColor'] ) ? $attributes['iconRightColor'] : '';

    $link_content = '';
    if ( $icon_left_show && $icon_left_name ) {
        $link_content .= apogei_button_iconify_markup( $icon_left_src, $icon_left_name, $icon_left_color );
    }
    $link_content .= '<span class="apogei-button-text">' . esc_html( $text ) . '</span>';
    if ( $icon_right_show && $icon_right_name ) {
        $link_content .= apogei_button_iconify_markup( $icon_right_src, $icon_right_name, $icon_right_color );
    }

    $html = sprintf(
        '<div class="wp-block-button is-style-%1$s"><a class="wp-block-button__link" href="%2$s"%3$s>%4$s</a></div>',
        esc_attr( $style ),
        $url,
        $target,
        $link_content
    );

    return $html;
}

/**
 * 2.5 Styles de bloc pour core/button (Apogei).
 *
 * Référence: les variations déclarées dans theme.json sont ignorées
 * si le style n'est pas enregistré (register_block_style).
 */
function apogei_register_button_block_styles() {
    $textdomain = 'twentytwentyfour-child-avec-templateparts';

    register_block_style(
        'core/button',
        [
            'name'  => 'apogei-primary',
            'label' => __( 'Principal Apo', $textdomain ),
        ]
    );

    register_block_style(
        'core/button',
        [
            'name'  => 'apogei-outline',
            'label' => __( 'Contour Apo', $textdomain ),
        ]
    );

    register_block_style(
        'core/button',
        [
            'name'  => 'apogei-transparent',
            'label' => __( 'Transparent Apo', $textdomain ),
        ]
    );

    register_block_style(
        'core/button',
        [
            'name'  => 'apogei-accent-green',
            'label' => __( 'Big Secondaire Apo', $textdomain ),
        ]
    );

    register_block_style(
        'core/button',
        [
            'name'  => 'apogei-xl-outline-primary',
            'label' => __( 'Big Principal Apo', $textdomain ),
        ]
    );

    register_block_style(
        'core/button',
        [
            'name'  => 'apogei-outline-accent',
            'label' => __( 'Contour Framboise Apo', $textdomain ),
        ]
    );
}
add_action( 'init', 'apogei_register_button_block_styles' );

/**
 * 2.6 Retirer les styles natifs "Plein/Contour" dans l’éditeur.
 */
function apogei_unregister_core_button_styles_editor() {
    if ( ! is_admin() ) {
        return;
    }

    wp_enqueue_script( 'wp-blocks' );
    wp_enqueue_script( 'wp-dom-ready' );
    wp_add_inline_script(
        'wp-blocks',
        "wp.domReady(function(){\n" .
        "  if (wp.blocks && wp.blocks.unregisterBlockStyle) {\n" .
        "    wp.blocks.unregisterBlockStyle('core/button','fill');\n" .
        "    wp.blocks.unregisterBlockStyle('core/button','outline');\n" .
        "  }\n" .
        "});\n",
        'after'
    );
}
add_action( 'enqueue_block_editor_assets', 'apogei_unregister_core_button_styles_editor' );

/**
 * 3. Charger les fonctions de maps.
 */
require get_stylesheet_directory() . '/inc/pole-map.php';

/**
 * 4. Enqueue Leaflet + JS carte pôle.
 */
function apogei_enqueue_pole_scripts() {

    if ( ! wp_style_is( 'leaflet-css', 'enqueued' ) ) {
        wp_enqueue_style(
            'leaflet-css',
            'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
            [],
            '1.9.4'
        );
    }

    if ( ! wp_script_is( 'leaflet-js', 'enqueued' ) ) {
        wp_enqueue_script(
            'leaflet-js',
            'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
            [],
            '1.9.4',
            true
        );
    }

    wp_enqueue_script(
        'apogei-pole-map',
        get_stylesheet_directory_uri() . '/js/pole-map.js',
        [ 'leaflet-js' ],
        wp_get_theme()->get( 'Version' ),
        true
    );
}

/**
 * 5. Shortcode [apogei_pole_map] : carte Leaflet des établissements + dispositifs du pôle.
 */
function apogei_pole_map_shortcode( $atts ) {

    $pole_term = apogei_get_current_pole_term();

    if ( ! $pole_term ) {
        return '<p>Pôle non trouvé pour cette page.</p>';
    }

    // Markers de ce pôle (établissements + dispositifs).
    $markers = apogei_get_markers(
        [
            'tax_query' => [
                [
                    'taxonomy' => 'pole',
                    'field'    => 'term_id',
                    'terms'    => $pole_term->term_id,
                ],
            ],
        ],
        [ 'etablissement', 'dispositif' ]
    );

    if ( empty( $markers ) ) {
        return '<p>Aucun établissement ou dispositif localisé pour ce pôle.</p>';
    }

    // Enqueue Leaflet + script carte.
    apogei_enqueue_pole_scripts();

    // Localisation des données pour JS.
    wp_localize_script(
        'apogei-pole-map',
        'ApogeiPoleMap',
        [
            'markers' => $markers,
        ]
    );

    ob_start();
    ?>
    <section class="apogei-pole-map">
        <div id="apogei-pole-map" style="height:400px"></div>
    </section>
    <?php

    return ob_get_clean();
}
add_shortcode( 'apogei_pole_map', 'apogei_pole_map_shortcode' );


/**
 * 6. Récupère le terme de pôle à partir de la page courante ou de l’archive taxonomie.
 * Avec twentytwentyfour-child-prototype : support page (slug = terme) ET archive taxonomy pole,
 * pour que le template taxonomy-pole.html et les shortcodes fonctionnent quand on clique sur un pôle dans le menu.
 */

function apogei_get_current_pole_term() {
    // Archive taxonomie « pôle » : le terme est l’objet de la requête.
    if ( is_tax( 'pole' ) ) {
        $term = get_queried_object();
        if ( $term instanceof WP_Term && $term->taxonomy === 'pole' ) {
            return $term;
        }
        return null;
    }

    // Page dont le slug correspond à un terme pôle (comportement historique).
    if ( ! is_page() ) {
        return null;
    }

    $page_id = get_the_ID();
    $slug    = get_post_field( 'post_name', $page_id );

    if ( ! $slug ) {
        return null;
    }

    $pole_term = get_term_by( 'slug', $slug, 'pole' );
    if ( ! $pole_term || is_wp_error( $pole_term ) ) {
        return null;
    }

    return $pole_term;
}

/**
 * 7. Rendu générique d'un accordéon accessible.
 *
 * @param string $accordion_classes Classes CSS supplémentaires.
 * @param array  $items             Sections de l'accordéon.
 */
function apogei_render_accordion( $accordion_classes, $items ) {
    if ( empty( $items ) ) {
        return '';
    }

    $accordion_classes = trim( 'apogei-accordion ' . $accordion_classes );
    ob_start();
    ?>
    <div class="<?php echo esc_attr( $accordion_classes ); ?>">
        <?php foreach ( $items as $index => $item ) :
            $panel_id  = isset( $item['id'] ) ? $item['id'] : 'accordion-panel-' . $index;
            $button_id = isset( $item['button_id'] ) ? $item['button_id'] : 'accordion-btn-' . $index;
            $title     = isset( $item['title'] ) ? $item['title'] : '';
            $content   = isset( $item['content'] ) ? $item['content'] : '';
            // Tous les panels fermés au chargement, le JS gère l’ouverture.
            $hidden_attr = 'hidden="hidden" aria-hidden="true"';
            ?>
            <div class="apogei-accordion__item">
                <button
                        class="apogei-accordion__button"
                        type="button"
                        aria-expanded="false"
                        aria-controls="<?php echo esc_attr( $panel_id ); ?>"
                        id="<?php echo esc_attr( $button_id ); ?>"
                >
                    <?php echo esc_html( $title ); ?>
                </button>

                <div
                        class="apogei-accordion__panel"
                        id="<?php echo esc_attr( $panel_id ); ?>"
                        role="region"
                        aria-labelledby="<?php echo esc_attr( $button_id ); ?>"
                    <?php echo $hidden_attr; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                >
                    <?php
                    // Contenu déjà sécurisé en amont (the_title, esc_html, esc_url, etc.).
                    echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                    ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <?php
    return ob_get_clean();
}


/**
 * 8. Shortcode [apogei_pole_contenu_etablissements]
 *    Établissements du pôle, regroupés par type en accordéon.
 */
function apogei_pole_contenu_etablissements_shortcode( $atts ) {

    $pole_term = apogei_get_current_pole_term();

    if ( ! $pole_term ) {
        return '';
    }

    $types_etab = [ 'IME', 'EEP', 'FH','ESAT', 'CAJ', 'FAM', 'EAM', 'MAS' ];
    $accordion_items = [];
    // Permet de cacher le tab s'il n'y a aucun établissement
    $has_output = false;

    foreach ( $types_etab as $index => $type_label ) {
        // Query des établissements pour ce type...
        $etab_args  = [
            'post_type'      => 'etablissement',
            'posts_per_page' => -1,
            'tax_query'      => [
                [
                    'taxonomy' => 'pole',
                    'field'    => 'term_id',
                    'terms'    => $pole_term->term_id,
                ],
            ],
            'meta_query'     => [
                [
                    'key'   => 'type_etab_disp',
                    'value' => $type_label,
                ],
            ],
            'orderby'        => 'title',
            'order'          => 'ASC',
        ];
        $etab_query = new WP_Query( $etab_args );

        if ( ! $etab_query->have_posts() ) {
            wp_reset_postdata();
            continue;
        }

        $has_output = true;

    ob_start();
    ?>

        <div class="apogei-pole__cards">
            <?php
            while ( $etab_query->have_posts() ) :
                $etab_query->the_post();
                $adresse    = get_field( 'adresse' );
                $code_postal = get_field( 'code_postal' );
                $ville      = get_field( 'ville' );
                ?>
                <?php
                $card_resume = get_field( 'card_resume' );
                $excerpt = '';
                if ( $card_resume ) {
                    $excerpt = $card_resume;
                } else {
                    $excerpt = wp_trim_words( get_the_excerpt(), 30, '…' );
                }
                $card_classes = 'apogei-card-etablissement';
                if ( $excerpt ) {
                    $card_classes .= ' apogei-card-etablissement--has-excerpt';
                }
                $type_etab_disp = get_field( 'type_etab_disp' );
                $capacite = get_field( 'capacite' );
                ?>
                <article class="<?php echo esc_attr( $card_classes ); ?>">
                    <?php if ( has_post_thumbnail() ) : ?>
                        <a class="apogei-card-etablissement__image-link" href="<?php the_permalink(); ?>">
                            <?php
                            echo get_the_post_thumbnail(
                                get_the_ID(),
                                'medium',
                                [
                                    'class' => 'apogei-card-etablissement__image',
                                    'loading' => 'lazy',
                                    'decoding' => 'async',
                                ]
                            );
                            ?>
                        </a>
                    <?php endif; ?>
                    <div class="apogei-card-etablissement__content">
                        <h3><?php the_title(); ?></h3>
                        <?php if ( $excerpt ) : ?>
                            <div class="apogei-card-etablissement__excerpt">
                                <?php
                                if ( $card_resume ) {
                                    echo wp_kses_post( $excerpt );
                                } else {
                                    echo esc_html( $excerpt );
                                }
                                ?>
                            </div>
                        <?php endif; ?>
                        <?php if ( $type_etab_disp || $adresse || $code_postal || $ville || $capacite ) : ?>
                            <ul class="apogei-card-etablissement__meta">
                                <?php if ( $type_etab_disp ) : ?>
                                    <li class="apogei-card-etablissement__meta-item apogei-card-etablissement__meta-item--type">
                                        <iconify-icon class="apogei-icon" icon="dashicons:tag" aria-hidden="true"></iconify-icon>
                                        <span><?php echo esc_html( $type_etab_disp ); ?></span>
                                    </li>
                                <?php endif; ?>
                                <?php if ( $adresse || $code_postal || $ville ) : ?>
                                    <li class="apogei-card-etablissement__meta-item apogei-card-etablissement__meta-item--address">
                                        <iconify-icon class="apogei-icon" icon="dashicons:location" aria-hidden="true"></iconify-icon>
                                        <span>
                                            <?php
                                            echo esc_html( $adresse );
                                            if ( $code_postal || $ville ) {
                                                echo ' ' . esc_html( trim( $code_postal . ' ' . $ville ) );
                                            }
                                            ?>
                                        </span>
                                    </li>
                                <?php endif; ?>
                                <?php if ( $capacite ) : ?>
                                    <li class="apogei-card-etablissement__meta-item apogei-card-etablissement__meta-item--capacity">
                                        <iconify-icon class="apogei-icon" icon="dashicons:groups" aria-hidden="true"></iconify-icon>
                                        <span><?php echo esc_html( $capacite ); ?></span>
                                    </li>
                                <?php endif; ?>
                            </ul>
                        <?php endif; ?>
                        <div class="apogei-card-etablissement__footer">
                            <a class="apogei-card-etablissement__cta" href="<?php the_permalink(); ?>">Voir la fiche</a>
                        </div>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
        <?php
        wp_reset_postdata();

        $accordion_items[] = [
            'id'        => 'etab-type-' . $index,
            'button_id' => 'etab-type-btn-' . $index,
            'title'     => $type_label,
            'content'   => ob_get_clean(),
        ];
    }

    if ( ! $has_output ) {
        return '';
    }

    ob_start();
    ?>

    <section class="apogei-pole-liste apogei-pole-liste--etablissements">
        <h2>Établissements du pôle</h2>
        <?php echo apogei_render_accordion( 'apogei-accordion--etablissements', $accordion_items ); ?>
    </section>
    <?php
    $html = ob_get_clean();

    return $html;
}
add_shortcode( 'apogei_pole_contenu_etablissements', 'apogei_pole_contenu_etablissements_shortcode' );


/**
 * 8. Shortcode [apogei_pole_contenu_etablissements]
 *    Établissements du pôle, regroupés par type en accordéon.
 */
function apogei_pole_contenu_dispositifs_shortcode( $atts ) {

    $pole_term = apogei_get_current_pole_term();

    if ( ! $pole_term ) {
        return '';
    }

    // Types de dispositifs pour l'accordéon
    $types_disp = [
        'DAR',
        'UEMA',
        'UEE',
        'EMASco',
        'SESSAD',
        'SA',
        'SAVS',
        'AFS',
        'SAMSAH',
        'Plateforme emploi inclusion',
        'ATVM',
    ];
    $accordion_items = [];
    // Permet de cacher le tab s'il n'y a aucun dispositif
    $has_output = false;

    foreach ( $types_disp as $index => $type_label ) {
        // Query des établissements pour ce type...
        $disp_args  = [
            'post_type'      => 'dispositif',
            'posts_per_page' => -1,
            'tax_query'      => [
                [
                    'taxonomy' => 'pole',
                    'field'    => 'term_id',
                    'terms'    => $pole_term->term_id,
                ],
            ],
            'meta_query'     => [
                [
                    'key'   => 'type_etab_disp',
                    'value' => $type_label,
                ],
            ],
            'orderby'        => 'title',
            'order'          => 'ASC',
        ];
        $disp_query = new WP_Query( $disp_args );

        if ( ! $disp_query->have_posts() ) {
            wp_reset_postdata();
            continue;
        }

        $has_output = true;

        ob_start();
        ?>

        <div class="apogei-pole__cards">
            <?php
            while ( $disp_query->have_posts() ) :
                $disp_query->the_post();
                $adresse    = get_field( 'adresse' );
                $code_postal = get_field( 'code_postal' );
                $ville      = get_field( 'ville' );
                ?>
                <?php
                $card_resume = get_field( 'card_resume' );
                $excerpt = '';
                if ( $card_resume ) {
                    $excerpt = $card_resume;
                } else {
                    $excerpt = wp_trim_words( get_the_excerpt(), 30, '…' );
                }
                $card_classes = 'apogei-card-etablissement';
                if ( $excerpt ) {
                    $card_classes .= ' apogei-card-etablissement--has-excerpt';
                }
                $type_etab_disp = get_field( 'type_etab_disp' );
                $capacite = get_field( 'capacite' );
                ?>
                <article class="<?php echo esc_attr( $card_classes ); ?>">
                    <?php if ( has_post_thumbnail() ) : ?>
                        <a class="apogei-card-etablissement__image-link" href="<?php the_permalink(); ?>">
                            <?php
                            echo get_the_post_thumbnail(
                                get_the_ID(),
                                'medium',
                                [
                                    'class' => 'apogei-card-etablissement__image',
                                    'loading' => 'lazy',
                                    'decoding' => 'async',
                                ]
                            );
                            ?>
                        </a>
                    <?php endif; ?>
                    <div class="apogei-card-etablissement__content">
                        <h3><?php the_title(); ?></h3>
                        <?php if ( $excerpt ) : ?>
                            <div class="apogei-card-etablissement__excerpt">
                                <?php
                                if ( $card_resume ) {
                                    echo wp_kses_post( $excerpt );
                                } else {
                                    echo esc_html( $excerpt );
                                }
                                ?>
                            </div>
                        <?php endif; ?>
                        <?php if ( $type_etab_disp || $adresse || $code_postal || $ville || $capacite ) : ?>
                            <ul class="apogei-card-etablissement__meta">
                                <?php if ( $type_etab_disp ) : ?>
                                    <li class="apogei-card-etablissement__meta-item apogei-card-etablissement__meta-item--type">
                                        <iconify-icon class="apogei-icon" icon="dashicons:tag" aria-hidden="true"></iconify-icon>
                                        <span><?php echo esc_html( $type_etab_disp ); ?></span>
                                    </li>
                                <?php endif; ?>
                                <?php if ( $adresse || $code_postal || $ville ) : ?>
                                    <li class="apogei-card-etablissement__meta-item apogei-card-etablissement__meta-item--address">
                                        <iconify-icon class="apogei-icon" icon="dashicons:location" aria-hidden="true"></iconify-icon>
                                        <span>
                                            <?php
                                            echo esc_html( $adresse );
                                            if ( $code_postal || $ville ) {
                                                echo ' ' . esc_html( trim( $code_postal . ' ' . $ville ) );
                                            }
                                            ?>
                                        </span>
                                    </li>
                                <?php endif; ?>
                                <?php if ( $capacite ) : ?>
                                    <li class="apogei-card-etablissement__meta-item apogei-card-etablissement__meta-item--capacity">
                                        <iconify-icon class="apogei-icon" icon="dashicons:groups" aria-hidden="true"></iconify-icon>
                                        <span><?php echo esc_html( $capacite ); ?></span>
                                    </li>
                                <?php endif; ?>
                            </ul>
                        <?php endif; ?>
                        <div class="apogei-card-etablissement__footer">
                            <a class="apogei-card-etablissement__cta" href="<?php the_permalink(); ?>">Voir la fiche</a>
                        </div>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>
        <?php
        wp_reset_postdata();

        $accordion_items[] = [
            'id'        => 'disp-type-' . $index,
            'button_id' => 'disp-type-btn-' . $index,
            'title'     => $type_label,
            'content'   => ob_get_clean(),
        ];
    }

    if ( ! $has_output ) {
        return '';
    }

    ob_start();
    ?>

    <section class="apogei-pole-liste apogei-pole-liste--dispositifs">
        <h2>Dispositifs du pôle</h2>
        <?php echo apogei_render_accordion( 'apogei-accordion--dispositifs', $accordion_items ); ?>
    </section>
    <?php
    $html = ob_get_clean();

    return $html;
}
add_shortcode( 'apogei_pole_contenu_dispositifs', 'apogei_pole_contenu_dispositifs_shortcode' );




/**
 * 9. Shortcode coordonnées fiche établissement/dispositif.
 */
function fiche_etab_disp_coordonnees_shortcode( $atts ) {
    if ( ! is_singular( [ 'etablissement', 'dispositif' ] ) ) {
        return '';
    }

    $adresse    = get_field( 'adresse' );
    $cp         = get_field( 'code_postal' );
    $ville      = get_field( 'ville' );
    $telephone  = get_field( 'telephone' );
    $email      = get_field( 'email' );
    $site_web   = get_field( 'site_web' );

    ob_start();
    ?>
    <section id="coordonnees" class="fiche-etab-disp-coordonnees">
        <h2>Coordonnées</h2>

        <?php if ( $adresse || $cp || $ville ) : ?>
            <p>
                <?php
                echo esc_html( $adresse );
                if ( $cp || $ville ) {
                    echo '<br>' . esc_html( trim( $cp . ' ' . $ville ) );
                }
                ?>
            </p>
        <?php endif; ?>

        <?php if ( $telephone ) : ?>
            <p>Tél : <a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', $telephone ) ); ?>">
                    <?php echo esc_html( $telephone ); ?>
                </a></p>
        <?php endif; ?>

        <?php if ( $email ) : ?>
            <p>Email : <a href="mailto:<?php echo esc_attr( $email ); ?>">
                    <?php echo esc_html( $email ); ?>
                </a></p>
        <?php endif; ?>

        <?php if ( $site_web ) : ?>
            <p>Site : <a href="<?php echo esc_url( $site_web ); ?>">
                    <?php echo esc_html( $site_web ); ?>
                </a></p>
        <?php endif; ?>
    </section>
    <?php

    return ob_get_clean();
}
add_shortcode( 'fiche_etablissement_dispositif_coordonnees', 'fiche_etab_disp_coordonnees_shortcode' );

/**
 * 10. Filtre : injecter le badge Jobs dans la nav secondaire fiche.
 * Le bloc core/navigation avec className apogei-nav-secondaire-fiche__nav reçoit
 * un span.apogei-nav-secondaire-fiche__badge sur le lien #jobs.
 * Compteur : filtre apogei_nav_secondaire_jobs_count (défaut 0, masqué si 0).
 */
function apogei_nav_secondaire_inject_jobs_badge( $block_content, $block ) {
    if ( 'core/navigation' !== ( $block['blockName'] ?? '' ) ) {
        return $block_content;
    }

    $class_name = $block['attrs']['className'] ?? '';
    if ( strpos( $class_name, 'apogei-nav-secondaire-fiche__nav' ) === false ) {
        return $block_content;
    }

    if ( ! is_singular( [ 'etablissement', 'dispositif' ] ) ) {
        return $block_content;
    }

    $count = apply_filters( 'apogei_nav_secondaire_jobs_count', 0, get_the_ID() );
    if ( $count < 1 ) {
        return $block_content;
    }

    $badge = '<span class="apogei-nav-secondaire-fiche__badge" aria-label="' . esc_attr( sprintf( _n( '%d offre', '%d offres', $count, 'twentytwentyfour-child-avec-templateparts' ), $count ) ) . '">' . esc_html( (string) $count ) . '</span>';

    return preg_replace(
        '/(<a[^>]+href=["\']#jobs["\'][^>]*>)(.*?)(<\/a>)/is',
        '$1$2' . $badge . '$3',
        $block_content,
        1
    );
}
add_filter( 'render_block', 'apogei_nav_secondaire_inject_jobs_badge', 10, 2 );

/**
 * 11. Filtre apogei_nav_secondaire_jobs_count : compteur pour le badge Jobs.
 * Source : CPT offre, champ ACF fiche_associee = ID de la fiche courante.
 */
function apogei_nav_secondaire_jobs_count_from_cpt( $count, $post_id ) {
	if ( ! $post_id ) {
		return $count;
	}
	$query = new WP_Query(
		[
			'post_type'      => 'offre',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'fields'         => 'ids',
			'meta_query'     => [
				[
					'key'   => 'fiche_associee',
					'value' => $post_id,
					'compare' => '=',
				],
			],
		]
	);
	return $query->found_posts;
}
add_filter( 'apogei_nav_secondaire_jobs_count', 'apogei_nav_secondaire_jobs_count_from_cpt', 10, 2 );

/**
 * 12. Shortcode [apogei_fiche_offres] : affiche la liste des offres (CPT) liées à la fiche.
 * À insérer dans la section Jobs (Content Area) des fiches établissement/dispositif.
 */
function apogei_fiche_offres_shortcode() {
	if ( ! is_singular( [ 'etablissement', 'dispositif' ] ) ) {
		return '';
	}
	$fiche_id = get_the_ID();
	$query    = new WP_Query(
		[
			'post_type'      => 'offre',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'orderby'        => 'date',
			'order'          => 'DESC',
			'meta_query'     => [
				[
					'key'     => 'fiche_associee',
					'value'   => $fiche_id,
					'compare' => '=',
				],
			],
		]
	);
	if ( ! $query->have_posts() ) {
		return '';
	}
	ob_start();
	echo '<ul class="apogei-fiche-offres">';
	while ( $query->have_posts() ) {
		$query->the_post();
		$offre_id = get_the_ID();
		$titre    = get_the_title();
		$url      = function_exists( 'get_field' ) ? get_field( 'url', $offre_id ) : '';
		$contrat  = function_exists( 'get_field' ) ? get_field( 'type_contrat', $offre_id ) : '';
		$label    = $contrat ? $titre . ' - ' . $contrat : $titre;
		echo '<li class="apogei-fiche-offres__item">';
		if ( $url ) {
			echo '<a href="' . esc_url( $url ) . '" class="apogei-fiche-offres__link">' . esc_html( $label ) . ' →</a>';
		} else {
			echo '<span>' . esc_html( $label ) . '</span>';
		}
		echo '</li>';
	}
	wp_reset_postdata();
	echo '</ul>';
	return ob_get_clean();
}
add_shortcode( 'apogei_fiche_offres', 'apogei_fiche_offres_shortcode' );

/**
 * 13. Meta box « Ajouter une offre » sur les fiches établissement/dispositif.
 * Lien vers création d'une offre avec fiche_associee pré-remplie.
 */
function apogei_add_offre_metabox() {
	add_meta_box(
		'apogei_add_offre',
		__( 'Offres', 'twentytwentyfour-child-avec-templateparts' ),
		'apogei_add_offre_metabox_cb',
		[ 'etablissement', 'dispositif' ],
		'side',
		'default'
	);
}
function apogei_add_offre_metabox_cb( $post ) {
	$url = admin_url( 'post-new.php?post_type=offre&fiche_associee=' . (int) $post->ID );
	?>
	<p>
		<a href="<?php echo esc_url( $url ); ?>" class="button button-primary">
			<?php esc_html_e( 'Ajouter une offre', 'twentytwentyfour-child-avec-templateparts' ); ?>
		</a>
	</p>
	<?php
}
add_action( 'add_meta_boxes', 'apogei_add_offre_metabox' );

/**
 * 14. Pré-remplissage du champ fiche_associee lors de la création d'une offre depuis une fiche.
 * Détecte ?fiche_associee=ID dans l'URL sur post-new.php?post_type=offre.
 */
function apogei_prefill_fiche_associee( $value, $post_id, $field ) {
	global $pagenow;
	if ( 'post-new.php' !== $pagenow || ( isset( $_GET['post_type'] ) && 'offre' !== $_GET['post_type'] ) ) {
		return $value;
	}
	if ( ! isset( $_GET['fiche_associee'] ) || ! is_numeric( $_GET['fiche_associee'] ) ) {
		return $value;
	}
	$fiche_id = (int) $_GET['fiche_associee'];
	$post     = get_post( $fiche_id );
	if ( ! $post || ! in_array( $post->post_type, [ 'etablissement', 'dispositif' ], true ) ) {
		return $value;
	}
	return $fiche_id;
}
add_filter( 'acf/load_value/key=field_apogei_offre_fiche', 'apogei_prefill_fiche_associee', 10, 3 );

/**
 * 15. Shortcode [apogei_offre_cta] : boutons CTA pour une offre.
 * À utiliser dans la Boucle de requête (page Nos offres) ou sur la page single offre.
 * - Liste : « Voir l'offre » (Principal Apo) + « Postuler » (Contour Framboise Apo)
 * - Single : uniquement « Postuler » (Contour Framboise Apo)
 *
 * Note : dans une Boucle de requête, le shortcode n'a pas accès au post courant.
 * Le filtre render_block ci-dessous intercepte le bloc Shortcode et utilise le postId du contexte.
 *
 * @param int  $offre_id ID du post offre.
 * @param bool $single   Si true, n'affiche que le bouton Postuler (page single offre).
 */
function apogei_offre_cta_render( $offre_id, $single = false ) {
	if ( ! $offre_id || 'offre' !== get_post_type( $offre_id ) ) {
		return '';
	}
	$permalink = get_permalink( $offre_id );
	$url       = function_exists( 'get_field' ) ? get_field( 'url', $offre_id ) : '';
	ob_start();
	?>
	<div class="apogei-offre-cta">
		<?php if ( ! $single ) : ?>
			<div class="wp-block-button is-style-apogei-primary">
				<a href="<?php echo esc_url( $permalink ); ?>" class="wp-block-button__link">
					<?php esc_html_e( 'Voir l\'offre', 'twentytwentyfour-child-avec-templateparts' ); ?>
				</a>
			</div>
		<?php endif; ?>
		<?php if ( $url && is_string( $url ) ) : ?>
			<div class="wp-block-button is-style-apogei-outline-accent">
				<a href="<?php echo esc_url( $url ); ?>" class="wp-block-button__link" target="_blank" rel="noopener noreferrer">
					<?php esc_html_e( 'Postuler', 'twentytwentyfour-child-avec-templateparts' ); ?>
				</a>
			</div>
		<?php endif; ?>
	</div>
	<?php
	return ob_get_clean();
}

function apogei_offre_cta_shortcode() {
	return apogei_offre_cta_render( get_the_ID(), is_singular( 'offre' ) );
}
add_shortcode( 'apogei_offre_cta', 'apogei_offre_cta_shortcode' );

/**
 * 15b. Intercepte le bloc Shortcode [apogei_offre_cta] dans une Boucle de requête.
 * Le bloc Shortcode n'a pas accès au postId du contexte ; on le récupère via $block_instance.
 */
function apogei_render_block_shortcode_offre_cta( $block_content, $block, $block_instance ) {
	if ( 'core/shortcode' !== ( $block['blockName'] ?? '' ) ) {
		return $block_content;
	}
	$content = $block['innerHTML'] ?? $block['innerContent'][0] ?? '';
	if ( false === strpos( $content, 'apogei_offre_cta' ) ) {
		return $block_content;
	}
	$post_id = null;
	if ( $block_instance instanceof WP_Block && ! empty( $block_instance->context['postId'] ) ) {
		$post_id = (int) $block_instance->context['postId'];
	}
	if ( ! $post_id ) {
		$post_id = get_the_ID();
	}
	$output = apogei_offre_cta_render( $post_id, false );
	return '' !== $output ? $output : $block_content;
}
add_filter( 'render_block', 'apogei_render_block_shortcode_offre_cta', 10, 3 );

/**
 * 15c. Injecte le bouton Postuler dans la zone de contenu (single offre).
 * Évite le bloc Shortcode + wpautop qui ajoutait des <br>.
 */
function apogei_single_offre_append_cta( $content ) {
	if ( ! is_singular( 'offre' ) ) {
		return $content;
	}
	$cta = apogei_offre_cta_render( get_the_ID(), true );
	return $content . $cta;
}
add_filter( 'the_content', 'apogei_single_offre_append_cta', 15 );
































