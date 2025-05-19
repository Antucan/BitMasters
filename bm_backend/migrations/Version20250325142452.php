<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250325142452 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create purchases table for user-product relationship';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE purchases (
            id INT AUTO_INCREMENT NOT NULL,
            user_id INT NOT NULL,
            product_id INT NOT NULL,
            quantity INT NOT NULL CHECK(quantity > 0),
            purchase_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            status ENUM("pending", "completed", "cancelled") NOT NULL DEFAULT "pending",
            PRIMARY KEY(id),
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE purchases');
    }
}
