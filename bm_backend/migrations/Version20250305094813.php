<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250305094813 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        //tabla images con url y id, un producto puede tener varias imagenes
        $this->addSql('CREATE TABLE images(
            id INT AUTO_INCREMENT NOT NULL,
            url VARCHAR(255) NOT NULL,
            product_id INT NOT NULL,
            PRIMARY KEY(id),
            FOREIGN KEY(product_id) REFERENCES products(id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE images');
    }
}
