<?php
namespace Seeders;

use Doctrine\Seeders;
use Faker\Factory;
use Doctrine\DBAL\Connection;

class UserSeeder{
    private Connection $connection;
    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function run(int $count = 10): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < $count; $i++) {
            $name = $faker->firstName;
            $surname = $faker->lastName;
            $phone = $faker->randomNumber(9, true);
            $mail = $faker->unique()->safeEmail;
            $password = password_hash('password', PASSWORD_BCRYPT); // Contraseña genérica
            $role = $faker->randomElement([1, 2]); // 1 para admin, 2 para client
            
            $this->connection->executeStatement(
                'INSERT INTO users (name, surname, phone, mail, password, role) VALUES (?, ?, ?, ?, ?, ?)',
                [$name, $surname, $phone, $mail, $password, $role]
            );
        }
    }
}