<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250305094020 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create reviews table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE reviews(
            id INT AUTO_INCREMENT NOT NULL,
            title VARCHAR(255) NOT NULL,
            user_id INT NOT NULL,
            product_id INT NOT NULL,
            content TEXT NOT NULL,
            score INT NOT NULL CHECK(score >= 1 AND score <= 5),
            PRIMARY KEY(id),
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(product_id) REFERENCES products(id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void {
        $this->addSql('DROP TABLE reviews');
    }
}
