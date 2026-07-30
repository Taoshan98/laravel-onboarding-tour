<?php

/**
 * Asset Bundler & Minifier Script for Laravel Onboarding Tour
 * Concatenates modular CSS & JS files into production bundles.
 */

$baseDir = dirname(__DIR__);

/**
 * Minify CSS content
 */
function minifyCss(string $css): string
{
    // Remove block comments
    $css = preg_replace('!/\*[\s\S]*?\*/!', '', $css);
    // Remove whitespace around punctuation
    $css = preg_replace('/\s*([{}|:;,])\s*/', '$1', $css);
    // Collapse multiple whitespace
    $css = preg_replace('/\s+/', ' ', $css);
    // Remove unnecessary trailing semicolons
    $css = str_replace(';}', '}', $css);
    return trim($css);
}

/**
 * Minify JS content safely without breaking regex or string literals containing comment tokens
 */
function minifyJs(string $js): string
{
    $lines = explode("\n", $js);
    $cleanLines = [];
    $inBlockComment = false;

    foreach ($lines as $line) {
        $trimmed = trim($line);

        if ($inBlockComment) {
            if (str_contains($trimmed, '*/')) {
                $inBlockComment = false;
            }
            continue;
        }

        if (str_starts_with($trimmed, '/*')) {
            if (!str_contains($trimmed, '*/')) {
                $inBlockComment = true;
            }
            continue;
        }

        if ($trimmed === '' || str_starts_with($trimmed, '//')) {
            continue;
        }

        $cleanLines[] = $trimmed;
    }

    return implode("\n", $cleanLines);
}

// Build CSS Bundle
$cssModules = glob($baseDir . '/resources/css/modules/*.css');
sort($cssModules);
$cssRaw = '';
foreach ($cssModules as $file) {
    $cssRaw .= file_get_contents($file) . "\n";
}
$cssMinified = "/* Laravel Onboarding Tour CSS Bundle — Auto-generated */\n" . minifyCss($cssRaw);
file_put_contents($baseDir . '/resources/css/tour-styles.css', $cssMinified . "\n");
$cssLines = count(explode("\n", $cssMinified));
$cssSize = round(strlen($cssMinified) / 1024, 2);
echo "Bundled & minified " . count($cssModules) . " CSS modules -> resources/css/tour-styles.css ({$cssSize} KB, {$cssLines} lines)\n";

// Build JS Bundle
$jsModules = glob($baseDir . '/resources/js/modules/*.js');
sort($jsModules);
$jsRaw = "(function () {\n";
foreach ($jsModules as $file) {
    $jsRaw .= file_get_contents($file) . "\n";
}
$jsRaw .= "})();\n";
$jsMinified = "/** Laravel Onboarding Tour Engine — Auto-generated */\n" . minifyJs($jsRaw);
file_put_contents($baseDir . '/resources/js/tour-engine.js', $jsMinified . "\n");
$jsLines = count(explode("\n", $jsMinified));
$jsSize = round(strlen($jsMinified) / 1024, 2);
echo "Bundled & minified " . count($jsModules) . " JS modules -> resources/js/tour-engine.js ({$jsSize} KB, {$jsLines} lines)\n";
