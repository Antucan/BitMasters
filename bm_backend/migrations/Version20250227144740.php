<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250227144740 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE payment_methods (
            id INT AUTO_INCREMENT NOT NULL, 
            id_card INT,
            id_paypal INT,
            id_user INT NOT NULL,
            FOREIGN KEY (id_card) REFERENCES credit_cards(id),
            FOREIGN KEY (id_paypal) REFERENCES paypal_accounts(id),
            FOREIGN KEY (id_user) REFERENCES users(id),
            PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
