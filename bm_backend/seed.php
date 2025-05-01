<?php

require_once __DIR__ . '/vendor/autoload.php';

use Doctrine\DBAL\DriverManager;
use Symfony\Component\Dotenv\Dotenv;
use Seeders\RoleSeeder;
use Seeders\UserSeeder;
use Seeders\ProductSeeder;

// Cargar las variables de entorno desde el archivo .env
$dotenv = new Dotenv();
$dotenv->load(__DIR__ . '/.env');

// Obtener la URL de la base de datos desde la variable de entorno
$databaseUrl = $_ENV['DATABASE_URL'] ?? null;

if (!$databaseUrl) {
    die("Error: La variable DATABASE_URL no está configurada en el archivo .env\n");
}

// Crear la conexión usando DATABASE_URL
$connection = DriverManager::getConnection(['url' => $databaseUrl]);

try {
    // Ejecutar RoleSeeder
    $roleSeeder = new RoleSeeder($connection);
    $roleSeeder->run();
    echo "Roles insertados correctamente.\n";

    // Ejecutar UserSeeder
    $userSeeder = new UserSeeder($connection);
    $userSeeder->run(20); // Genera 20 usuarios
    echo "Usuarios insertados correctamente.\n";

    // Ejecutar ProductSeeder
    $productSeeder = new ProductSeeder($connection);
    $productSeeder->run(); // Genera 20 productos
    echo "Productos insertados correctamente.\n";
} catch (\Exception $e) {
    echo "Error al ejecutar los seeders: " . $e->getMessage() . "\n";
}