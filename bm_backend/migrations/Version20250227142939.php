<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250227142939 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE addresses (
            id INT AUTO_INCREMENT NOT NULL, 
            street_type VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            zip_code INT,
            city VARCHAR(255) NOT NULL,
            id_user INT NOT NULL, 
            FOREIGN KEY (id_user) REFERENCES users(id),
            PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE addresses');
    }
}
