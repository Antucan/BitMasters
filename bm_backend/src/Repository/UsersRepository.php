<?php

namespace App\Repository;

use App\Entity\Users;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Users>
 */
class UsersRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Users::class);
    }

       /**
        * @return Users[] Returns an array of Users objects
        */
       public function findByName(string $name)
       {
           return $this->createQueryBuilder('u')
               ->andWhere('u.name = :name')
               ->setParameter('name', $name)
               ->getQuery()
               ->getResult();
       }

         /**
          * @return Users[] Returns an array of Users objects
          */
          public function findByMail(string $mail)
          {
              return $this->createQueryBuilder('u')
                  ->andWhere('u.mail = :mail')
                  ->setParameter('mail', $mail)
                  ->getQuery()
                  ->getResult();
          }
        
       public function findById(int $id)
       {
           return $this->createQueryBuilder('u')
               ->andWhere('u.id = :id')
               ->setParameter('id', $id)
               ->getQuery()
               ->getResult();
       }
}
