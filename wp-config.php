<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе
 * установки. Необязательно использовать веб-интерфейс, можно
 * скопировать файл в "wp-config.php" и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки MySQL
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'wp1');

/** Имя пользователя MySQL */
define('DB_USER', 'root');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', '');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8mb4');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'p:/@lY%W)/=t2gXeTG=%jt?tB1;Bix[1#*^vUqM`2Bsx;!}fx0;@k{Mm_^HMVvun');
define('SECURE_AUTH_KEY',  '5=JfC82!AIReT=o8R`%0c ;f+q)+3j_F_vx%h6)|&0&j(q6w%]U[UKPFmOn<klxb');
define('LOGGED_IN_KEY',    'mXUz_W9#>~#d]=X;ai]F]v+oGV<;6iJ55`JaCS(W]G 2`cqsr${-t:+Z*[~Y`TB]');
define('NONCE_KEY',        '_5LBr@B,_;&yQiF?2h>RWOHQ?S_H!uu(MXx@$uDFkeS$}v9# a!^SFlVxN4p}?aM');
define('AUTH_SALT',        ':X0`gjdQjDo-!#hS _s52mT7R5M%#i=l-Eau0ep4Q8)Q{zE$7aGyPY?#`bQ5<N1@');
define('SECURE_AUTH_SALT', 'nCq!p_6zU45N>)_]}Wx}AQ!]n8wl<c-+<==Ey=9Ya4pl2+!8V8S46Lgi2]AC#W&(');
define('LOGGED_IN_SALT',   'b=`p;2TLsgzi!n&LoJv91#iY9Gi}s4qu(66i]I0ZkTx/~ `3j;Qj|3cR2e d1}8C');
define('NONCE_SALT',       '+xs0kmaih/<U9m`8U223$8pC,q ^Mz_+@0:NLva0WW&ZQD-g!rDlM5NRv&9K@#F5');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'wp_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 *
 * Информацию о других отладочных константах можно найти в Кодексе.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
