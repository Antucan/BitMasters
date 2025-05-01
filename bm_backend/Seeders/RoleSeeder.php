<?php

namespace Seeders;

use Doctrine\DBAL\Connection;

class RoleSeeder
{
    private Connection $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function run(): void
    {
        $roles = [
            ['id' => 1, 'role_name' => 'admin'],
            ['id' => 2, 'role_name' => 'client'],
        ];

        foreach ($roles as $role) {
            $this->connection->executeStatement(
                'INSERT INTO roles (id, role_name) VALUES (?, ?)',
                [$role['id'], $role['role_name']]
            );
        }
    }
}