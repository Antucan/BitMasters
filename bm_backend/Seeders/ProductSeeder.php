<?php

namespace Seeders;

use Doctrine\DBAL\Connection;

class ProductSeeder
{
    private Connection $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }
    public function run(): void{
        //con faker
        $faker = \Faker\Factory::create();  
        for ($i = 0; $i < 10; $i++) {
            $name = $faker->word;
            $description = $faker->sentence;
            $category = $faker->randomElement(['consolas', 'juegos', 'merchandising', 'hardware', 'coleccionismo', 'perifericos', 'accesorios']);
            //id de usuario aleatorio
            $user_id = rand(1, 10);
            $price = $faker->randomFloat(2, 1, 100);
            $img_url = 'https://antiguedadeseldrac.com/uploads/productos/0/0/0/9/5/1/6/IMG_3170.jpg';
            $status = 0;//en venta, 1 vendido
            
            $this->connection->executeStatement(
                'INSERT INTO products (name, description, category, user_id, price, img_url) VALUES (?, ?, ?, ?, ?, ?)',
                [$name, $description, $category, $user_id, $price, $img_url]
            );
        }

    }
}
